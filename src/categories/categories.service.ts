import { All, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { ManagerError } from 'src/common/errors/manager.error';
import { ResponseAllCategories } from './interfaces/response-categories.interface';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CategoriesService {

  /*private categories: CategoryEntity[] = [
    { id: '1', name: 'category1', description: 'dec1', isActive: true },
    { id: '2', name: 'category2', description: 'dec2', isActive: true },
    { id: '3', name: 'category3', description: 'dec3', isActive: true },
    { id: '4', name: 'category4', description: 'dec4', isActive: true },
    { id: '5', name: 'category5', description: 'dec5', isActive: true },
  ]*/

  constructor (
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    
    try {
    const category = await this.categoryRepository.save(createCategoryDto)
      if(!category){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Category not create!',
        })
      }

      return category;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllCategories> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
    

      //const total = this.categories.filter((category) => category.isActive === true).length;
     // const total = await  this.categoryRepository.count({where : {isActive:true}});
      //;
      //metodo facil
      //const data = this.categories.filter((category) => category.isActive === true).slice(skip, limit);
      //const data = await this.categoryRepository.find({where :{isActive:true},  take  : limit,  skip  :   skip})
      const [ total,data] =await Promise.all([
        this.categoryRepository.count({where : {isActive:true}}),
        this.categoryRepository.find({where :{isActive:true},  take  : limit,  skip  :   skip}),
      ]);
      const lastPage = Math.ceil(total / limit);
      return {
        page,
        limit,
        lastPage,
        total,
        data
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<CategoryEntity> {
    try {
      const category = await this.categoryRepository.createQueryBuilder('category').where({id,isActive:true})
      .leftJoinAndSelect('category.product','product')
      .getOne()
      if (!category) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "Category not found",
        })
      }

      return category
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult>{
    try {
      const Category =await this.categoryRepository.update({id},updateCategoryDto)
      if (Category.affected ===  0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

   return Category

      }catch (error) {
        ManagerError.createSignatureError(error.message);
      }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const category = await this.categoryRepository.update({id},{isActive:false})
      if (category.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Category not found',
        });
      }


      return category;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

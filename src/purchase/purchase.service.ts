import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerError } from '../common/errors/manager.error';

import { Repository, UpdateResult } from 'typeorm';
import { PurchaseEntity } from './entities/purchase.entity';
import { ResponseAllpurchase } from './interfaces/response-paymen.interface';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { PurchaseStatus } from './../common/enums/purchaseStatus.enum';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>
) { }


async create(createPurchaseDto: CreatePurchaseDto): Promise<PurchaseEntity> {
  try {
      const purchase = await this.purchaseRepository.save({...createPurchaseDto, status:PurchaseStatus.PENDIG_APPROVAL})
      if (!purchase) {
          throw new ManagerError({
              type: 'CONFLICT',
              message: 'purchase not created!',
          });
      }
      return purchase;
  } catch (error) {
      ManagerError.createSignatureError(error.message);
  }
}

async findAll(paginationDto: PaginationDto): Promise<ResponseAllpurchase> {
  const { limit, page } = paginationDto;
  const skip = (page - 1) * limit;
  try {
      const [total, data] = await Promise.all([
          this.purchaseRepository.count({where: {isActive: true} }),
          this.purchaseRepository.createQueryBuilder('purchase').where({isActive: true})
        .leftJoinAndSelect('purchase.payment','payment')
        .take(limit)
        .skip(skip)
        .getMany()
      ])
      const lastPage = Math.ceil(total / limit);

      if(!total){
          new ManagerError({
              type: "NOT_FOUND",
              message: "No hay pagos!"
          })
      }
      return {
          page,
          limit,
          lastPage,
          total,
          data,
      }; } catch (error) {
        ManagerError.createSignatureError(error.message);
    }
  }


  async findOne(id: string): Promise<PurchaseEntity> {
    try {
        const purchase = await this.purchaseRepository.createQueryBuilder('payment').where({id,isActive:true})
        .leftJoinAndSelect('purchase.payment','payment')
        .getOne()
        if (!purchase) {
            throw new ManagerError({
                type: 'NOT_FOUND',
                message: 'pago not found',
            });
        }
        return purchase;
    } catch (error) {
        ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<UpdateResult> {
    try {
        const purchase = await this.purchaseRepository.update(id, updatePurchaseDto)
        if (purchase.affected === 0) {
            throw new ManagerError({
                type: 'NOT_FOUND',
                message: 'Supplier not found',
            });
        }
        return purchase
    } catch (error) {
        ManagerError.createSignatureError(error.message);
    }
  }
 
  async remove(id: string): Promise<UpdateResult> {
    try {
        const purchase = await this.purchaseRepository.update({id}, {isActive: false})
        if (purchase.affected === 0) {
            throw new ManagerError({
                type: 'NOT_FOUND',
                message: 'Supplier not found',
            });
        }
  
        return purchase
    } catch (error) {
        ManagerError.createSignatureError(error.message);
    }
  }
}
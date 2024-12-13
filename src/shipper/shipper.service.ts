import { Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";
import { ManagerError } from "../common/errors/manager.error";
import { ApiOneResponse, ApiAllResponse } from "../common/interfaces/api-response.interface";
import { Repository, UpdateResult } from "typeorm";
import { ShipperEntity } from "./entities/shipper.entity";
import { CreateShipperDto } from "./dto/create-shipper.dto";
import { UpdateShipperDto } from "./dto/update-shipper.dto";


@Injectable()
export class ShipperService {
  constructor(
      @InjectRepository(ShipperEntity)
      private readonly shipperRepository: Repository<ShipperEntity>
    ){}
    async create(createShipperDto: CreateShipperDto): Promise<ApiOneResponse<ShipperEntity>> {
      try {
        const method = await this.shipperRepository.save( createShipperDto );
        if( !method ){
          throw new ManagerError({
            type: "CONFLICT",
            message: "employee not created!",
          })
        }
  
        return {
          status: {
            statusMsg: "CREATED",
            statusCode: HttpStatus.CREATED,
            error: null,
          },
          data: method,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async findAll( paginationDto: PaginationDto ): Promise<ApiAllResponse<ShipperEntity>> {
      const { limit, page } = paginationDto;
      const skip = ( page - 1 ) * limit;
  
      try {
        
        const [ total, data ] = await Promise.all([
          this.shipperRepository.count({where: {isActive:true}}),
          this.shipperRepository.createQueryBuilder("Shipper")
          .where({isActive: true})
          .skip(skip)
          .leftJoinAndSelect('shipper.order','order')
          .limit(limit)
          .getMany(),
        ]);
        const lastPage = Math.ceil( page / limit );
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          meta: {
            page,
            lastPage,
            limit,
            total
          },
          data
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async findOne(id: string): Promise<ApiOneResponse<ShipperEntity>> {
      try {
        const shipper = await this.shipperRepository.createQueryBuilder('shipper')
        .where({isActive: true})
        .leftJoinAndSelect('shipper.order','order')
        .getOne()
        if( !shipper ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "shipper not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: shipper,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async update(id: string, updateShipperDto: UpdateShipperDto): Promise<ApiOneResponse<UpdateResult>> {
      try {
        const shipper = await this.shipperRepository.update( {id, isActive: true}, updateShipperDto );
        if( shipper.affected === 0 ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "shipper not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: shipper,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
      try {
        const shipper = await this.shipperRepository.update( {id, isActive: true}, {isActive: false} );
        if( shipper.affected === 0 ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "shipper not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: shipper,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
}

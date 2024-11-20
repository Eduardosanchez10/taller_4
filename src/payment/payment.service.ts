import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentEntity } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ResponseAllProducts } from 'src/products/interfaces/response-products.interface';
import { ResponseAllpayments } from './interfaces/response-paymen.interface';

@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>
) { }


async create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
  try {
      const payment = await this.paymentRepository.save(createPaymentDto)
      if (!payment) {
          throw new ManagerError({
              type: 'CONFLICT',
              message: 'Supplier not created!',
          });
      }
      return payment;
  } catch (error) {
      ManagerError.createSignatureError(error.message);
  }
}

async findAll(paginationDto: PaginationDto): Promise<ResponseAllpayments> {
  const { limit, page } = paginationDto;
  const skip = (page - 1) * limit;
  try {
      const [total, data] = await Promise.all([
          this.paymentRepository.count({where: {isActive: true} }),
          this.paymentRepository.createQueryBuilder('payment').where({isActive: true})
        .leftJoinAndSelect('payment.purchase','purchase')
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

  async findOne(id: string): Promise<PaymentEntity> {
    try {
        const payment = await this.paymentRepository.createQueryBuilder('payment').where({id,isActive:true})
        .leftJoinAndSelect('payment.purchase','purchase')
        .getOne()
        if (!payment) {
            throw new ManagerError({
                type: 'NOT_FOUND',
                message: 'pago not found',
            });
        }
        return payment;
    } catch (error) {
        ManagerError.createSignatureError(error.message);
    }
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
        const payment = await this.paymentRepository.update({id}, {isActive: false})
        if (payment.affected === 0) {
            throw new ManagerError({
                type: 'NOT_FOUND',
                message: 'payment not found',
            });
        }
  
        return payment
    } catch (error) {
        ManagerError.createSignatureError(error.message);
    }
  }
}

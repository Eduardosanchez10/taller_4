import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create( @Body() createPaymentDto: CreatePaymentDto ){
      return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ){
      return this.paymentService.findAll( paginationDto );
  }

  @Get(':id')
  findOne( @Param('id', ParseUUIDPipe) id: string ){
      return this.paymentService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }
  
  @Delete(':id')
  remove( @Param('id', ParseUUIDPipe) id: string ){
      return this.paymentService.remove(id);
  }
}
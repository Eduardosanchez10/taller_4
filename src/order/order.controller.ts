import { Controller, Post, Body, Get, Query, Param, Patch, Delete } from "@nestjs/common";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";

import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createorderDto: CreateOrderDto) {
    return this.orderService.create(createorderDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.orderService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
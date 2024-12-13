import { Controller, Post, Body, Get, Query, Param, ParseUUIDPipe, Patch, Delete } from "@nestjs/common";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";

import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { EmployeeService } from "./employee.service";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";


@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.employeeService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.remove(id);
  }
}

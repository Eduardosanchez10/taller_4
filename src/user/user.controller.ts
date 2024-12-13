import { Controller, Post, Body, Get, Query, Param, ParseIntPipe, Patch, Delete } from "@nestjs/common";
import { PaginationDto } from "src/common/dtos/pagination/pagination.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserService } from "./user.service";


@Controller('users')
export class UserController {

    constructor( private readonly userService: UserService ){}
    
    @Post()
    create( @Body() createUserDto: CreateUserDto ){
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll( @Query() paginationDto: PaginationDto ){
        return this.userService.findAll( paginationDto );
    }

    @Get(':id')
    findOne( @Param('id', ParseIntPipe) id: number ){
        return this.userService.findOne(id);
    }

    @Patch(':id')
    update( @Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto ){
        return this.userService.update(id, updateUserDto);
    }
    
    @Delete(':id')
    remove( @Param('id', ParseIntPipe) id: number ){
        return this.userService.remove(id);
    }
}





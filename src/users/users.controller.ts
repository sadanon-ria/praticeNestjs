import { Body, Controller, Delete, Get,
     Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { HttpStatus } from '@nestjs/common';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {

    }

    @Get()
    findAll( @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.usersService.findAll(role)
    }

    @Get('interns')
    findAllInterns(){
        return []
    }    

    @Get(':id') // ค่า default (400 Bad Request) ต้องการแค่ parse int ธรรมดา
    findOne( @Param('id', ParseIntPipe) id:number ){
        return this.usersService.findOne(id)
    }

    // @Get(':id') // กำหนดเองได้ เช่น 406 ต้องการปรับแต่งพฤติกรรม
    // findOne( @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id:number ){
    //     return this.usersService.findOne(id)
    // }

    @Post()
    create( @Body(ValidationPipe) createuserDto: createUserDto ){
        return this.usersService.create(createuserDto)
    }

    @Patch(':id')
    update( @Param('id', ParseIntPipe) id:number, @Body(ValidationPipe) userupdateDto: UpdateUserDto ){
        return this.usersService.update(id, userupdateDto)
    }

    @Delete(':id')
    delete( @Param('id', ParseIntPipe) id:number ){
        return this.usersService.delete(id)
    }
}

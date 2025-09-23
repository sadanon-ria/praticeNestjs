import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "หมู",
            "email": "pig@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "หมา",
            "email": "dog@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 3,
            "name": "กา",
            "email": "eka@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 4,
            "name": "ไก่",
            "email": "kai@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 5,
            "name": "แมว",
            "email": "cat@gmail.com",
            "role": "ENGINEER"
        }
    ]

    findAll( role?: 'INTERN' | 'ENGINEER' | 'ADMIN' ){
        if(role){
            const roleArray = this.users.filter(user => user.role === role)
            if( roleArray.length === 0 ){
                throw new NotFoundException("User Role Not Found")
            }
            return roleArray
        }
        return this.users
    }

    findOne( id: number ) {
        const user = this.users.find(user => user.id === id)
        if(!user){
            throw new NotFoundException("User Not Found")
        }
        return user
    }

    create( createuserDto: createUserDto ){
        const userByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createuserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update( id:number, userupdateDto: UpdateUserDto ){
        this.users = this.users.map( user => {
            if( user.id === id ){
                return { ...user, ...userupdateDto }
            }
            return user
        })
        return this.findOne(id)
    }

    delete( id:number ){
        const removeUser = this.findOne(id)
        if(!removeUser){
            return "User not found"
        }
        this.users = this.users.filter(user => user.id !== id)

        return removeUser
    }
}

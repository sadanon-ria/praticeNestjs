import { Injectable } from '@nestjs/common';

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
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne( id: number ) {
        const user = this.users.find(user => user.id === id)
        return user
    }

    create(user: { name:string, email: string, role: "INTERN" | "ENGINEER" | "ADMIN" }){
        const userByHighestId = [...this.users].sort((a,b) => b.id =a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }
}

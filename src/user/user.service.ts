import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './user.dto';
import { Model } from 'mongoose';
import { IUser } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

    async create(createUserDto: CreateUserDto) {
        const newUser = new this.userModel({
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            department: createUserDto.department,
            role: createUserDto.role,
            password: createUserDto.password,
        });
        const result = await newUser.save();
        return result.id;
    }

    async findUser(email: string) {
        const user = await this.userModel.findOne({ email: email }).exec()
        return user
    }
}

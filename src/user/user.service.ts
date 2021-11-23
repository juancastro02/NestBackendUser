import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import UserInterface from './interface/user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private userModel: Model<UserInterface>
        ){}

    async getUsers(): Promise<UserInterface[]>{
      const users = await this.userModel.find()
      return users
    }

    async createUser(createUserDTO: UserDTO):  Promise<UserInterface>{
       const user = new this.userModel(createUserDTO)
       return await user.save()
    }

    async deleteUser(userId: string): Promise<UserInterface>{
        const user =  await this.userModel.findByIdAndDelete(userId)
        return user
    }

    async updateUser(userId, createUserDTO:UserDTO): Promise<UserInterface>{
        const user = await this.userModel.findByIdAndUpdate(userId, createUserDTO, { new: true })
        return user

    }

    async getUser(userId: string): Promise<UserInterface> {
        const user = await this.userModel.findById(userId); 
        return user;
    }

}

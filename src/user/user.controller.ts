import { Controller, Get, Post, Put, Delete, Body, Res, HttpStatus, Param, Query, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}

    @Post('/')
    async createUser(@Res() res, @Body() UserDataDTO: UserDTO ){
       const user = await this.userService.createUser(UserDataDTO)
       return res.status(HttpStatus.OK).json({
           ok: true,
           user
       })
    }

    @Get('/')
    async getUsers(@Res() res){
        const user = await this.userService.getUsers()
        return res.status(HttpStatus.OK).json({
            user
        })
    }


    @Get('/:userId')
    async getUser(@Res() res, @Param('userId') userId) {
        const user = await this.userService.getUser(userId);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    // Delete user: /delete?userID=5c9d45e705ea4843c8d0e8f7
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') UserID) {
        const UserDeleted = await this.userService.deleteUser(UserID);
        if (!UserDeleted) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Deleted Successfully',
            UserDeleted
        });
    }

    // Update user: /update?userID=5c9d45e705ea4843c8d0e8f7
    @Put('/update')
    async updateUser(@Res() res, @Body() createUserDTO: UserDTO, @Query('userID') userID) {
        const updatedUser = await this.userService.updateUser(userID, createUserDTO);
        if (!updatedUser) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Updated Successfully',
            updatedUser 
        });
    }

}

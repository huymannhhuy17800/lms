import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { User, UserRole } from "../entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateUserDto } from "../dto/update-user.dto";


@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(@InjectModel(User.name) private userModel: Model<User> ){
        super(userModel);
    }

    async findByEmail(email : string) {
        return this.userModel.findOne({email});
    }

    async deleteByEmail(email : string): Promise<void> {
        await this.userModel.findOneAndDelete({
            email : email
        })
    }

    async updateRoleInstructor(id : string) {
        const updatedUser = await this.userModel.findOneAndUpdate({_id: id}, {$set : {role : UserRole.INSTRUCTOR}});
        return updatedUser;
    }

    async findById(id : string) {
        return await this.userModel.findById({id});
    }

    async findByIdAndUpdate(id : string, data: UpdateUserDto) {
        return await this.userModel.findByIdAndUpdate({_id : id , $set : data});
    }

}
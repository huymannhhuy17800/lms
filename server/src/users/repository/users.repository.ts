import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { User } from "../entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


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

}
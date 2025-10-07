import { Model } from 'mongoose';

export interface IBaseRepository<T> {
    save(item: Partial<T>): Promise<T>;

    findById(id: string): Promise<T | null>;

    findAll(): Promise<T[] | []>;

    delete(id : string) : Promise<T | null> ;

}

export class BaseRepository<T> implements IBaseRepository<T> {
    constructor(private model: Model<T>) {}

    async save(item: Partial<T>): Promise<T> {
        return await this.model.create(item);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById({ _id: id }).exec();
    }

    async findAll(): Promise<T[] | []> {
        return await this.model.find({});
    }

    async delete(id: string) : Promise<T | null> {
        return await this.model.findByIdAndDelete({id});
    }


}
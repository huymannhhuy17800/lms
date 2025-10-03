import { Model } from 'mongoose';

export interface IBaseRepository<T> {
    save(item: Partial<T>): Promise<T>;

    findOne(id: string): Promise<T | null>;

}

export class BaseRepository<T> implements IBaseRepository<T> {
    constructor(private model: Model<T>) {}

    async save(item: Partial<T>): Promise<T> {
        return await this.model.create(item);
    }

    async findOne(id: string): Promise<T | null> {
        return await this.model.findOne({ _id: id }).exec();
    }

}
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

/* eslint-disable */
@Injectable()
export class DatabaseService {
    constructor(@InjectConnection() private readonly connection : Connection){}

    getConnectionStatus() : string {
        switch (this.connection.readyState) {
            case 0 : return 'disconnected';
            case 1 : return 'connected';
            case 2 : return 'connecting';
            case 3 : return 'disconnecting';
            default : return 'unknown status';
        }
    }
}

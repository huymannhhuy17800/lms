/* eslint-disable */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({ 
   imports : [
    ConfigModule.forRoot({ isGlobal : true}),
    MongooseModule.forRootAsync({
        imports : [ConfigModule],
        useFactory : async (config : ConfigService) => ({
            uri : config.get<string>('DATABASE_URL')
        }),
        inject : [ConfigService]
    })
   ],
   providers : [DatabaseService],
   exports : [DatabaseService]
})
export class DatabaseModule {
    // Database connection and related providers would be set up here
}

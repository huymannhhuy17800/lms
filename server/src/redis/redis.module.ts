import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
    imports : [
        ConfigModule.forRoot({ isGlobal: true }),
        CacheModule.registerAsync({
            isGlobal: true, // Use cache anywhere in app
            imports: [ConfigModule], // Config module for getting config from .env file
            useFactory: async (config : ConfigService) => {
                const store = await redisStore({
                    ttl : 30 * 1000, // 30s
                    socket: {
                        host: config.get<string>('REDIS_URL'),
                        port: config.get<number>('REDIS_PORT')
                    }
                });
                return { store }
            },
            inject: [ConfigService]
        })
    ]
})
export class RedisModule {}

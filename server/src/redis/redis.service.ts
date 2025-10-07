// import { Injectable, OnModuleDestroy } from '@nestjs/common';
// import Redis from 'ioredis';

// @Injectable()
// export class RedisService implements OnModuleDestroy{
//     private readonly redis : Redis;

//     constructor() {
//         this.redis = new Redis({host : 'localhost', port : 6379})
//     }

//     async set(key : string, value : string) : Promise<void> {
//         await this.redis.set(key, value);
//     }

//     async get(key : string) : Promise<string | null> {
//         return await this.redis.get(key);
//     }

//     async delete(key : string) : Promise<void> {
//         await this.redis.del(key);
//     }

//     async keys(pattern : string) : Promise<string[] | null> {
//         return await this.redis.keys(pattern);
//     }

//     onModuleDestroy() {
//         this.redis.disconnect();
//     }
// }

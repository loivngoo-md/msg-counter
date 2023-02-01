import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FacebookM } from 'src/facebook-m/entities/facebook-m.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        // TypeOrmModule.forRootAsync({
        //     useFactory: () => ({
        //         type: 'mysql',
        //         host: '107.178.100.240',
        //         port: 3306,
        //         username: 'root',
        //         password: 'Levcloud2021@@',
        //         database: 'msg',
        //         entities: [FacebookM],
        //         synchronize: true,
        //         logging: true,

        //     })
        // }),
        MongooseModule.forRootAsync({
            useFactory: async () => {
                return {
                    uri: `mongodb+srv://loivngoo:023WiupPQqMGrLgh@cluster0.d8slc.mongodb.net`,
                    dbName: 'msg'

                }
            }
        })
    ]
})
export class DatabaseModule { }

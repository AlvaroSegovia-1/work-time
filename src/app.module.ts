import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkTimeLogsModule } from './work-time-logs/work-time-logs.module';
import { TotalTimeLogsModule } from './total-time-logs/total-time-logs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
//import process from 'process';
//import { getConnectionOptions } from 'typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env'],
      //ignoreEnvFile: true,
    }),
    /*  TypeOrmModule.forRootAsync({
      useFactory: async () =>
      Object.assign(await getConnectionOptions(),{
        autoLoadEntities: true,
      })
    }) */

    /*  TypeOrmModule.forRoot({
      type: 'postgres',
      //host: process.env.DATABASE_HOST,
      host: 'localhost',
      //port: parseInt(process.env.DATABASE_PORT) || 5432,
      port: 5432,
      username: 'postgres', //process.env.DATABASE_USER,
      password: '',
      database: 'db_nest',
      autoLoadEntities: true, // es de nestjs
      //entities: ['dist/**/ // *.entity{.ts,.js}'], sustituye al anterior
    //synchronize: true, // solo para desarrollo, de nestjs
    //retryDelay: 3000,
    //retryAttempts: 10,
    // })*/
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),

    ProjectsModule,
    WorkTimeLogsModule,
    TotalTimeLogsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

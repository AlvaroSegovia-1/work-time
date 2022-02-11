import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkTimeLogsModule } from './work-time-logs/work-time-logs.module';
import { TotalTimeLogsModule } from './total-time-logs/total-time-logs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: 'pass_nest',
      database: '',
      autoLoadEntities: true,
      synchronize: true, // solo para desarrollo
    }),
    ProjectsModule,
    WorkTimeLogsModule,
    TotalTimeLogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

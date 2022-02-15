import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWorkTimeLogDto } from './dto/create-work-time-log.dto';
import { UpdateWorkTimeLogDto } from './dto/update-work-time-log.dto';
import { WorkTimeLog } from './entities/work-time-log.entity';

@Injectable()
export class WorkTimeLogsService {
  constructor(
    @InjectRepository(WorkTimeLog)
    private workTimeRepository: Repository<WorkTimeLog>,
  ) {}

  async create(
    createWorkTimeLogDto: CreateWorkTimeLogDto,
    user: User,
  ): Promise<WorkTimeLog> {
    const tempEntity = await this.workTimeRepository.create({
      ...createWorkTimeLogDto,
      user: user,
    });
    return this.workTimeRepository.save(tempEntity);
  }

  findAll() {
    return `This action returns all workTimeLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workTimeLog`;
  }

  update(id: number, updateWorkTimeLogDto: UpdateWorkTimeLogDto) {
    return `This action updates a #${id} workTimeLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} workTimeLog`;
  }
}

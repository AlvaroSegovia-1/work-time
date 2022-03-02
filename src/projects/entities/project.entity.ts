//import { ApiProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { WorkTimeLog } from 'src/work-time-logs/entities/work-time-log.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('projects_nests')
export class Project {
  //@ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  //@ApiProperty({
  //  description:
  //    'Código alphanumérico 8-16 digitos, en letras minúsculas unico',
  //  type: 'integer',
  //})
  @Column({
    type: 'character varying',
    unique: true,
    comment: 'Key unica del proyecto',
    length: 16,
  })
  key: string;

  @ApiProperty({ description: 'Titulo' })
  @Column({
    type: 'character varying',
    comment: 'Titulo del proyecto',
    length: 80,
  })
  title: string;

  @ApiProperty({ description: 'Description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Horas planificadas', type: 'integer' })
  @Column({ name: 'planned_hours', type: 'integer' })
  plannedHours: number;

  @Exclude()
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
    eager: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => WorkTimeLog, (workTimeLog) => workTimeLog.project)
  workTimeLogs: WorkTimeLog[];

  /*  @JoinTable({
    name: 'project_category',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' }
  }); */
  /* @ManyToMany(() => Category, { eager: true },
  categories?: Category[]; */
}

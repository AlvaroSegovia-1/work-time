import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  JoinColumn,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('work-time-logs')
export class WorkTimeLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint' })
  hours: number;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  // Se añade estas dos columnas al hacer los Join
  @Exclude()
  @Column({ name: 'user_id' })
  userId: number;

  @Exclude()
  @Column({ name: 'project_id' })
  projectId: number;

  @ManyToOne(() => User, (user) => user.workTimeLogs, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
    eager: true, // Devuelve las relaciones
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Project, (project) => project.workTimeLogs, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
    eager: true,
  })
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Project;
}

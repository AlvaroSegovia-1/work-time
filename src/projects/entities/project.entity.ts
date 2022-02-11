//import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  //@ApiProperty({ description: 'Titulo' })
  @Column({
    type: 'character varying',
    comment: 'Titulo del proyecto',
    length: 80,
  })
  title: string;

  //@ApiProperty({ description: 'Description' })
  @Column({ type: 'text' })
  description: string;

  //@ApiProperty({ description: 'Horas planificadas', type: 'integer' })
  @Column({ name: 'planned_hours', type: 'integer' })
  plannedHours: number;
  //@Column()
  owner?: any;
}

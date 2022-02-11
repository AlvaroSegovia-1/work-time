import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

/* const mock: Project[] = [
  {
    id: 1,
    key: 'marte2030',
    description: 'descri',
    title: 'title',
    plannedHours: 250,
    owner: 'miowner',
  },
  {
    id: 2,
    key: 'marte2020',
    description: 'descri',
    title: 'title',
    plannedHours: 250,
    owner: 'miowner',
  },
  {
    id: 3,
    key: 'marte2030',
    description: 'descri',
    title: 'title',
    plannedHours: 250,
    owner: 'miowner',
  },
]; */

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  getManyProjects(): Promise<Project[]> {
    //return mock;
    return this.projectRepository.find();
  }

  getOneProject(projectId: number): Promise<Project> {
    return this.projectRepository.findOne(projectId);
  }

  async createOneProject(projectDto: CreateProjectDto): Promise<Project> {
    //throw new Error('Method not implemented.');
    /*  const a = mock[0];
    return {
      ...a,
      ...projectDto,
    }; */

    const exist = await this.projectRepository.count({
      where: {
        key: projectDto.key,
      },
    });
    if (exist > 0) {
      throw new ConflictException(`La key ${projectDto.key} ya existe`);
    }

    const tempEntity = await this.projectRepository.create(projectDto);
    return this.projectRepository.save(tempEntity);
  }

  async partialUpdateOneProject(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    //throw new Error('Method not implemented.');
    /* const res = mock.find((proj) => (proj.id = projectId));
    return {
      ...res,
      ...updateProjectDto,
    }; */
    const preloadData = {
      id: projectId,
      ...updateProjectDto,
    };
    const preloadedProject = await this.projectRepository.preload(preloadData);
    if (!preloadedProject) {
      throw new NotFoundException('El proyecto no existe');
    }
    return this.projectRepository.save(preloadedProject);
  }

  async deleteOneProject(projectId: number): Promise<void> {
    //throw new Error('Method not implemented.');
    const project = await this.projectRepository.findOne(projectId);
    if (!project) {
      return;
    }
    this.projectRepository.delete(project);
  }
}

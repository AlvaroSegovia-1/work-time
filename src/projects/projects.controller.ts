import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getManyProjects(): Promise<Project[]> {
    //return 'getManyProjects';
    //return mock;
    return this.projectsService.getManyProjects();
  }

  @Get(':projectId')
  @HttpCode(HttpStatus.OK)
  async getOneProject(@Param('projectId') projectId: number): Promise<Project> {
    //return 'getOneProject';
    //return projectId;
    //return mock[0];
    const project = await this.projectsService.getOneProject(projectId);
    if (!project) {
      throw new NotFoundException(`Proyecto con id ${projectId} no existe`);
    }
    return project;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createOneProject(@Body() projectDto: CreateProjectDto): Promise<Project> {
    //return 'postOneProject';
    // return {} as Project;
    return this.projectsService.createOneProject(projectDto);
  }

  /*  @ApiQuery({
    name: 'parametro',
    type: 'boolean',
    required: false,
    example: 'ASC',
  }) */
  @HttpCode(HttpStatus.OK)
  @Patch(':projectId')
  partialUpdateOneProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    //return 'partialUpdateOneProject';
    //return projectId;
    //return {} as Project;
    console.log(projectId);
    return this.projectsService.partialUpdateOneProject(
      projectId,
      updateProjectDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':projectId')
  deleteOneProject(@Param('projectId', ParseIntPipe) projectId: number) {
    //return 'deleteOneProject';
    //return projectId;
    return this.projectsService.deleteOneProject(projectId);
  }
}

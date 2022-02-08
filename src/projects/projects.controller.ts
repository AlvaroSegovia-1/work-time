import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getManyProjects(@Req() req): Project[] {
    //return 'getManyProjects';
    //return mock;
    return this.projectsService.getManyProjects();
  }

  @Get(':projectId')
  @HttpCode(HttpStatus.OK)
  getOneProject(@Param('projectId') projectId: number): Project {
    //return 'getOneProject';
    //return projectId;
    //return mock[0];
    return this.projectsService.getOneProject(projectId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createOneProject(@Body() projectDto: CreateProjectDto): Project {
    //return 'postOneProject';
    // return {} as Project;
    return this.projectsService.createOneProject(projectDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':projectId')
  partialUpdateOneProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Project {
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
  deleteOneProject(@Param('projectId') projectId: number) {
    //return 'deleteOneProject';
    //return projectId;
    return this.projectsService.deleteOneProject(projectId);
  }
}

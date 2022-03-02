import {
  Body,
  ClassSerializerInterceptor,
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/common/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserProjectAffiliation } from './decorators/user-project-affiliation.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { UserProjectAffiliationType } from './types/user-project-affiliation';

@ApiTags('projects')
@Controller('projects') // a nivel gobal
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getManyProjects(
    @AuthUser() authUser: User,
    @Param('projectId', ParseIntPipe) project: number,
    @UserProjectAffiliation() affiliation: UserProjectAffiliationType,
  ): Promise<Project[]> {
    //return 'getManyProjects';
    //return mock;
    return this.projectsService.getManyProjects(affiliation, authUser);
  }

  @Get(':projectId')
  @HttpCode(HttpStatus.OK)
  async getOneProject(
    @AuthUser() authUser: User,
    @Param('projectId') projectId: number,
  ): Promise<Project> {
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
  createOneProject(
    @AuthUser() authUser: User,
    @Body() projectDto: CreateProjectDto,
  ): Promise<Project> {
    console.log(authUser);
    //return 'postOneProject';
    // return {} as Project;
    return this.projectsService.createOneProject(projectDto, authUser);
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
    @AuthUser() authUser: User,
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
      authUser,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':projectId')
  deleteOneProject(
    @AuthUser() authUser: User,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    //return 'deleteOneProject';
    //return projectId;
    return this.projectsService.deleteOneProject(projectId, authUser);
  }
}

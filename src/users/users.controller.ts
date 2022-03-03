import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  //ParseIntPipe,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserAccountDto } from './dto/create-user-account.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/auth-user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
//import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@ApiBearerAuth('JWT')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) //para @Exclude
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserAccountDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  async findOne(
    @Param('username') username: string,
    @AuthUser() authUser: User,
  ) {
    const user = await this.usersService.findOneV2(username, authUser);
    return User.toDto(user);
  }

  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() authUser: User,
  ) {
    return this.usersService.update(username, updateUserDto, authUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // Para subir imagen
  /*  @Post(':username/profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  uploadPicture(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // implementacion de storage
    fs.writeFileSync('new-image.png', file.buffer.toString());
  } */

  @Post(':username/profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
      }),
    }),
  )
  uploadPicture(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // implementacion de storage
    // fs.writeFileSync('new-image.png', file.buffer.toString());
  }
}

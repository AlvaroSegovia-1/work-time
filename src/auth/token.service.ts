import {
  Injectable,
  //UnauthorizedException,
  //UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { InjectRepository } from "@nestjs/typeorm";
import { User } from 'src/users/entities/user.entity';
//import { Repository } from "typeorm";
//import { RefreshToken } from "./entities/refresh-token.entity";
import { JWTPayload } from './jwt.payload';
//import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

/* export interface RefreshTokenPayload {
  jti: string;
  sub: string;
} */

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(user: User): Promise<string> {
    const payload: JWTPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    // Firma del token
    return this.jwtService.sign(payload);
  }
}

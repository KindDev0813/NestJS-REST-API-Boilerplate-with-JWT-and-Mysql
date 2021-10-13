import { Injectable } from '@nestjs/common';
import { LoginResponseUsersDTO } from 'src/domains/users/dto/login-response-user.dto';
import { UsersService } from 'src/domains/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<LoginResponseUsersDTO> {
    const user = await this.userService.getByUsername(username);

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

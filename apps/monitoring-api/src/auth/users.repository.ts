import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      id: uuid(),
      username,
      password: hashedPassword,
    });
    try {
      await this.save(user);
    } catch (error) {
      console.log(error);
      if (error.name === 'MongoBulkWriteError') {
        throw new ConflictException(
          `Error while saving user: ${error.message}. Username already exists.`
        );
      }
    }
  }
}

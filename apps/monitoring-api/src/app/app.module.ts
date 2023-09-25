import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONN_STR,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User],
    }),
    AuthModule,
  ],
})
export class AppModule {}

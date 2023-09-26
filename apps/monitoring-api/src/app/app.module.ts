import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { AirModule } from '../air/air.module';
import { AirInfo } from '../air/air.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONN_STR,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User, AirInfo],
    }),
    AuthModule,
    AirModule,
  ],
})
export class AppModule {}

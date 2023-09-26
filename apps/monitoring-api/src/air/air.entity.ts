import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AirInfo {
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: true })
  _id: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column({ unique: true })
  isoCode: string;

  @Column()
  population: bigint;

  @Column()
  airQualityIndex: number;

  @Column()
  rank: number;
}

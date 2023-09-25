import { Exclude } from 'class-transformer';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: true })
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}

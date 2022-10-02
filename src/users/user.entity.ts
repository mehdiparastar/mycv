import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User With id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User With id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User With id', this.id);
  }
}

import { Report } from '../reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];


  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @AfterInsert()
  logInsert() {
    // console.log('Inserted User With id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    // console.log('Updated User With id', this.id);
  }

  @AfterRemove()
  logRemove() {
    // console.log('Removed User With id', this.id);
  }
}

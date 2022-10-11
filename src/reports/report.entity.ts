import { User } from '../users/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}

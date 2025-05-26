import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  surname: string;

  @Column({ type: 'varchar', length: 40, })
  email: string;

  @Column({ type: 'varchar', length: 14, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
}

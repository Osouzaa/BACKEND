import { Education } from 'src/modules/education/entities/education.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  passwordHash: string;

  @Column({ type: 'datetime2', nullable: true })
  verifiedAt: Date | null;

  @Column({ type: 'varchar', length: 14 })
  cpf: string;

  @Column({ type: 'varchar' })
  birthDate: string;

  @Column({ type: 'varchar', length: 20 })
  gender: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 2 })
  state: string;

  @Column({ type: 'varchar', length: 10 })
  zipCode: string;

  @Column({ type: 'varchar', nullable: true })
  urlZipCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Education, (education) => education.candidate)
  educations: Education[];

  // TODO: CRIAR ENTIDADE DE EDUCATIONS E EXPERIENCIES
}

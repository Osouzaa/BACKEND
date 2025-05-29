import { Candidate } from 'src/modules/candidates/entities/candidate.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  company: string;

  @Column({ type: 'varchar', length: 100 })
  position: string;

  @Column({ type: 'varchar' })
  startDate: string;

  @Column({ type: 'varchar', nullable: true })
  endDate: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  documentUrl: string;

  @ManyToOne(() => Candidate, (candidate) => candidate.experiences, { onDelete: 'CASCADE' })
  candidate: Candidate;
}

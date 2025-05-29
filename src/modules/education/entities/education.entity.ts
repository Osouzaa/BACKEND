import { EducationProgress } from 'src/common/enums/education-status.enum';
import { Candidate } from 'src/modules/candidates/entities/candidate.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('educations')
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  level: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  courseName?: string;

  @Column({ type: 'varchar', length: 100 })
  institution: string;

  @Column({ type: 'int' })
  graduationYear: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  documentUrl: string;

  @Column({
    type: 'varchar',
    enum: EducationProgress,
    default: EducationProgress.IN_PROGRESS,
  })
  progress: EducationProgress;

  @ManyToOne(() => Candidate, (candidate) => candidate.educations, {
    onDelete: 'CASCADE',
  })
  candidate: Candidate;
}

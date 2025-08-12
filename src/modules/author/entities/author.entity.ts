import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'authors' })
export class Author extends BaseORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Index()
  email: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;
}

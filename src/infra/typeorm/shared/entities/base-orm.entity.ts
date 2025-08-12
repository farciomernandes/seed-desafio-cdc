import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseORMEntity {
  @CreateDateColumn({
    type:
      process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp with time zone',
  })
  created_at: Date;

  @UpdateDateColumn({
    type:
      process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp with time zone',
  })
  updated_at: Date;

  @DeleteDateColumn({
    type:
      process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp with time zone',
  })
  deleted_at: Date;
}

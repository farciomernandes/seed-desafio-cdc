import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Author } from '@modules/author/entities/author.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorRepository
  extends Repository<Author>
{
  constructor(
    @InjectDataSource()
    readonly dataSource: DataSource,
  ) {
    super(Author, dataSource.createEntityManager());
  }
}

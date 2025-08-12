import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { CreateAuthorUseCase } from './usecases/create-author/author-user.usecase';
import { AuthorRepository } from '@infra/typeorm/repositories/author.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AuthorRepository, CreateAuthorUseCase],
  controllers: [AuthorController],
})
export class AuthorModule {}

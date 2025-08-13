import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CategoryRepository } from '@infra/typeorm/repositories/category.repository';
import { CreateCategoryUseCase } from './usecases/create-categorie/category-user.usecase';
import { CategoryController } from './category.controller';

@Module({
  imports: [HttpModule],
  providers: [CategoryRepository, CreateCategoryUseCase],
  controllers: [CategoryController],
})
export class CategoryModule {}

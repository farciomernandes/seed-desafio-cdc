import { CategoryRepository } from '@infra/typeorm/repositories/category.repository';
import { CreateCategoryDto } from '@modules/category/dtos/create-category.dto';
import { Category } from '@modules/category/entities/category.entity';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CreateCategoryUseCase {
  private readonly logger = new Logger(CreateCategoryUseCase.name);
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(payload: CreateCategoryDto): Promise<Category> {
    this.logger.log(
      `Start create Category with data: ${JSON.stringify(payload)}`,
    );

    await this.checkName(payload.name);

    const category = await this.categoryRepository.save(
      this.categoryRepository.create(payload),
    );
    this.logger.log(`Category with ${category.id} id created successfully`);

    return category;
  }

  private async checkName(name: string): Promise<void> {
    this.logger.log(`Checking if Category with name ${name} already exists`);
    const category = await this.categoryRepository.findOne({
      where: { name },
    });

    if (category) {
      this.logger.error(`Category with ${name} name already exists!`);
      throw new BadRequestException({
        message: 'Category with name already exists!',
        detail: `Name: ${name}`,
      });
    }
    this.logger.log(`Category with name ${name} does not exist`);
  }
}

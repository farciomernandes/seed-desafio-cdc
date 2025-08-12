import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AuthorRepository } from '@infra/typeorm/repositories/author.repository';
import { Author } from '@modules/author/entities/author.entity';
import { CreateAuthorDto } from '@modules/author/dtos/create-author.dto';

@Injectable()
export class CreateAuthorUseCase {
  private readonly logger = new Logger(CreateAuthorUseCase.name);
  constructor(private readonly authorRepository: AuthorRepository) {}

  async execute(payload: CreateAuthorDto): Promise<Author> {
    this.logger.log(
      `Start create author with data: ${JSON.stringify(payload)}`,
    );

    await this.checkEmail(payload.email);

    const author = await this.authorRepository.save(
      this.authorRepository.create(payload),
    );
    this.logger.log(`Author with ${author.id} id created successfully`);

    return author;
  }

  private async checkEmail(email: string): Promise<void> {
    this.logger.log(`Checking if author with email ${email} already exists`);
    const author = await this.authorRepository.findOne({
      where: { email },
    });

    if (author) {
      this.logger.error(`Author with ${email} email already exists!`);
      throw new BadRequestException({
        message: 'Author with email already exists!',
        detail: `Email: ${email}`,
      });
    }
    this.logger.log(`Author with email ${email} does not exist`);
  }
}

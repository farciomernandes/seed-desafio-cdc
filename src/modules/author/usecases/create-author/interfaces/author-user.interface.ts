import { CreateAuthorDto } from '@modules/author/dtos/create-author.dto';
import { Author } from '@modules/author/entities/author.entity';

export abstract class ICreateAuthorUseCase {
  abstract execute(payload: CreateAuthorDto): Promise<Author>;
}

import { BadRequestException } from '@nestjs/common';
import { CreateAuthorUseCase } from './author-user.usecase';
import { AuthorRepository } from '@infra/typeorm/repositories/author.repository';
import { CreateAuthorDto } from '@modules/author/dtos/create-author.dto';
import { Author } from '@modules/author/entities/author.entity';

type SutTypes = {
  sut: CreateAuthorUseCase;
  authorRepositoryStub: AuthorRepository;
};

const makeAuthorRepositoryStub = (): AuthorRepository => {
  return {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn((data: any) => ({ ...data, id: 'any_id' })),
  } as unknown as AuthorRepository;
};

const makeSut = (): SutTypes => {
  const authorRepositoryStub = makeAuthorRepositoryStub();

  const sut = new CreateAuthorUseCase(authorRepositoryStub);

  return {
    sut,
    authorRepositoryStub,
  };
};

describe('CreateAuthorUseCase', () => {
  test('Should throw BadRequestException if author already exists', async () => {
    const { sut, authorRepositoryStub } = makeSut();

    const createAuthorDto = new CreateAuthorDto();
    createAuthorDto.email = 'any_email';

    jest
      .spyOn(authorRepositoryStub, 'findOne')
      .mockResolvedValueOnce(Promise.resolve(new Author()));

    const promise = sut.execute(createAuthorDto);
    await expect(promise).rejects.toThrow(BadRequestException);
  });

  test('Should create and save author with correct data', async () => {
    const { sut, authorRepositoryStub } = makeSut();

    const createAuthorDto = new CreateAuthorDto();
    createAuthorDto.email = 'any_email';
    createAuthorDto.description = 'any_description';
    createAuthorDto.name = 'any_name';

    jest
      .spyOn(authorRepositoryStub, 'findOne')
      .mockResolvedValueOnce(Promise.resolve(null));

    jest.spyOn(authorRepositoryStub, 'create').mockReturnValue(new Author());

    await sut.execute(createAuthorDto);

    expect(authorRepositoryStub.create).toHaveBeenCalledWith(createAuthorDto);
    expect(authorRepositoryStub.save).toHaveBeenCalledTimes(1);
  });
});

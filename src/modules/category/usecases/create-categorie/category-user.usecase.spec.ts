import { BadRequestException } from '@nestjs/common';
import { CreateCategoryUseCase } from './category-user.usecase';
import { CategoryRepository } from '@infra/typeorm/repositories/category.repository';
import { CreateCategoryDto } from '@modules/category/dtos/create-category.dto';
import { Category } from '@modules/category/entities/category.entity';

type SutTypes = {
  sut: CreateCategoryUseCase;
  categoryRepositoryStub: CategoryRepository;
};

const makeCategoryRepositoryStub = (): CategoryRepository => {
  return {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn((data: any) => ({ ...data, id: 'any_id' })),
  } as unknown as CategoryRepository;
};

const makeSut = (): SutTypes => {
  const categoryRepositoryStub = makeCategoryRepositoryStub();

  const sut = new CreateCategoryUseCase(categoryRepositoryStub);

  return {
    sut,
    categoryRepositoryStub,
  };
};

describe('CreateCategoryUseCase', () => {
  test('Should throw BadRequestException if Category already exists', async () => {
    const { sut, categoryRepositoryStub } = makeSut();

    const createCategoryDto = new CreateCategoryDto();
    createCategoryDto.name = 'any_name';

    jest
      .spyOn(categoryRepositoryStub, 'findOne')
      .mockResolvedValueOnce(Promise.resolve(new Category()));

    const promise = sut.execute(createCategoryDto);
    await expect(promise).rejects.toThrow(BadRequestException);
  });

  test('Should create and save Category with correct data', async () => {
    const { sut, categoryRepositoryStub } = makeSut();

    const createCategoryDto = new CreateCategoryDto();

    createCategoryDto.name = 'any_name';

    jest
      .spyOn(categoryRepositoryStub, 'findOne')
      .mockResolvedValueOnce(Promise.resolve(null));

    jest
      .spyOn(categoryRepositoryStub, 'create')
      .mockReturnValue(new Category());

    await sut.execute(createCategoryDto);

    expect(categoryRepositoryStub.create).toHaveBeenCalledWith(
      createCategoryDto,
    );
    expect(categoryRepositoryStub.save).toHaveBeenCalledTimes(1);
  });
});

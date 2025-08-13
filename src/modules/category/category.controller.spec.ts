import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CreateCategoryUseCase } from './usecases/create-categorie/category-user.usecase';
import { CreateCategoryDto } from './dtos/create-category.dto';

describe('CategoryController', () => {
  let controller: CategoryController;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(async () => {
    const mockCreateCategoryUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        { provide: CreateCategoryUseCase, useValue: mockCreateCategoryUseCase },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    createCategoryUseCase = module.get<CreateCategoryUseCase>(
      CreateCategoryUseCase,
    );
  });

  it('should call createCategoryUseCase.execute with correct payload and return status 200', async () => {
    const dto: CreateCategoryDto = {
      name: 'Test',
    } as any;
    (createCategoryUseCase.execute as jest.Mock).mockResolvedValue({
      id: 'any_id',
      ...dto,
    });

    const result = await controller.create(dto);
    expect(createCategoryUseCase.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 'any_id', ...dto });
  });

  it('should handle BadRequestException from usecase', async () => {
    const dto: CreateCategoryDto = {
      name: 'Test',
    } as any;
    (createCategoryUseCase.execute as jest.Mock).mockRejectedValue({
      status: HttpStatus.BAD_REQUEST,
      message: 'Category with Name already exists!',
      detail: 'Name: exists@Name.com',
    });

    await expect(controller.create(dto)).rejects.toEqual({
      status: HttpStatus.BAD_REQUEST,
      message: 'Category with Name already exists!',
      detail: 'Name: exists@Name.com',
    });
  });
});

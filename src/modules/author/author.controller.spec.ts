import { Test, TestingModule } from '@nestjs/testing';
import { CreateAuthorUseCase } from './usecases/create-author/author-user.usecase';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { HttpStatus } from '@nestjs/common';
import { AuthorController } from './author.controller';

describe('AuthorController', () => {
  let controller: AuthorController;
  let createAuthorUseCase: CreateAuthorUseCase;

  beforeEach(async () => {
    const mockCreateAuthorUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        { provide: CreateAuthorUseCase, useValue: mockCreateAuthorUseCase },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    createAuthorUseCase = module.get<CreateAuthorUseCase>(CreateAuthorUseCase);
  });

  it('should call createAuthorUseCase.execute with correct payload and return status 200', async () => {
    const dto: CreateAuthorDto = {
      email: 'test@email.com',
      name: 'Test',
    } as any;
    (createAuthorUseCase.execute as jest.Mock).mockResolvedValue({
      id: 'any_id',
      ...dto,
    });

    const result = await controller.create(dto);
    expect(createAuthorUseCase.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 'any_id', ...dto });
    // Simula status 200, pois controller retorna apenas o resultado
    // Para validar status, o teste e2e (supertest) é o ideal
    // Aqui, valida que o método foi chamado e retornou o esperado
  });

  it('should handle BadRequestException from usecase', async () => {
    const dto: CreateAuthorDto = {
      email: 'exists@email.com',
      name: 'Test',
    } as any;
    (createAuthorUseCase.execute as jest.Mock).mockRejectedValue({
      status: HttpStatus.BAD_REQUEST,
      message: 'Author with email already exists!',
      detail: 'Email: exists@email.com',
    });

    await expect(controller.create(dto)).rejects.toEqual({
      status: HttpStatus.BAD_REQUEST,
      message: 'Author with email already exists!',
      detail: 'Email: exists@email.com',
    });
  });
});

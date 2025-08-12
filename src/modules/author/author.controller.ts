import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateAuthorUseCase } from './usecases/create-author/author-user.usecase';
import { CreateAuthorDto } from './dtos/create-author.dto';

@ApiTags('Author')
@Controller('authors')
export class AuthorController {
  constructor(private readonly createAuthorUseCase: CreateAuthorUseCase) {}

  @Post()
  @ApiOperation({
    summary: 'Criar autor',
  })
  @ApiBody({
    type: CreateAuthorDto,
    description: 'Payload para criar autor',
  })
  @ApiOkResponse({
    description: 'Autor criado com sucesso',
    type: CreateAuthorDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Author with email already exists!',
  })
  @HttpCode(HttpStatus.OK)
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<any> {
    return this.createAuthorUseCase.execute(createAuthorDto);
  }
}

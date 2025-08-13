import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateCategoryUseCase } from './usecases/create-categorie/category-user.usecase';
import { CreateCategoryDto } from './dtos/create-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  @ApiOperation({
    summary: 'Criar categoria',
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'Payload para criar categoria',
  })
  @ApiOkResponse({
    description: 'Categoria criada com sucesso',
    type: CreateCategoryDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Category with name already exists!',
  })
  @HttpCode(HttpStatus.OK)
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
    return this.createCategoryUseCase.execute(createCategoryDto);
  }
}

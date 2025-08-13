import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExceptionMessages } from '../../../shared/messages/ExceptionMessages';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name Category',
    example: 'Romance',
    required: true,
  })
  @IsNotEmpty({ message: ExceptionMessages.isNotEmpty('Name') })
  @IsString({ message: ExceptionMessages.isString('Name') })
  name: string;
}

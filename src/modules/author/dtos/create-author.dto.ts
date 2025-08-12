import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ExceptionMessages } from '../../../shared/messages/ExceptionMessages';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'The name of the Author',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty({ message: ExceptionMessages.isNotEmpty('Nome') })
  @IsString({ message: ExceptionMessages.isString('Nome') })
  name: string;

  @ApiProperty({
    description: 'The email of the Author',
    example: 'john.doe@example.com',
    required: true,
  })
  @IsEmail({}, { message: ExceptionMessages.isEmail('Email') })
  @IsNotEmpty({ message: ExceptionMessages.isNotEmpty('Email') })
  email: string;

  @ApiProperty({
    description: 'The description of the Author, limit 400 characters',
    example: 'An author from the 20th century',
    required: true,
  })
  @IsString({ message: ExceptionMessages.isString('Descrição') })
  @IsNotEmpty({ message: ExceptionMessages.isNotEmpty('Descrição') })
  @MaxLength(400, { message: 'Descrição deve ter no máximo 400 caracteres.' })
  description: string;
}

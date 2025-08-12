import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../main/app.module';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { DataSource } from 'typeorm';

let app: INestApplication;
let dataSource: DataSource;

async function setupDatabase() {
  dataSource = app.get(DataSource);
  await dataSource.synchronize(true);
}

async function downDatabase() {
  if (dataSource) {
    await dataSource.destroy();
  }
}

describe('AuthorController (e2e)', () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await setupDatabase();
  });

  afterEach(async () => {
    if (dataSource) {
      await dataSource.query('DELETE FROM authors');
    }
  });

  afterAll(async () => {
    await downDatabase();
    await app.close();
  });

  it('POST /authors deve retornar status 200 ao criar autor', async () => {
    const dto: CreateAuthorDto = {
      email: 'autor_e2e@email.com',
      name: 'Autor E2E',
      description: 'description 123',
    } as any;

    const response = await request(app.getHttpServer())
      .post('/authors')
      .send(dto);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(dto.email);
    expect(response.body.name).toBe(dto.name);
    expect(response.body.description).toBe(dto.description);
  });
});

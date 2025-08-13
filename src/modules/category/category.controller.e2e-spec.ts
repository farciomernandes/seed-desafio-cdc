import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../main/app.module';
import { CreateCategoryDto } from './dtos/create-category.dto';
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

describe('CategoryController (e2e)', () => {
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
      await dataSource.query('DELETE FROM categories');
    }
  });

  afterAll(async () => {
    await downDatabase();
    await app.close();
  });

  it('POST /categories deve retornar status 200 ao criar categoria', async () => {
    const dto: CreateCategoryDto = {
      name: 'Categoria E2E',
    } as any;

    const response = await request(app.getHttpServer())
      .post('/categories')
      .send(dto);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(dto.name);
  });
});

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@modules/health/health.module';
import { MainModule } from '@modules/main/main.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from '@infra/typeorm/datasource.config';
import { AuthorModule } from '@modules/author/author.module';
import { CategoryModule } from '@modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        await dataSource.initialize();
        return dataSource;
      },
    }),
    HealthModule,
    MainModule,
    AuthorModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'products',
      autoLoadEntities: true,  // Automatically load entities from TypeORM
      synchronize: true,       // Should be false in production to avoid data loss
    }),
    ProductModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configModule } from 'configure.root';
import { UserModule } from 'src/api/user/user.module';
import { TodoModule } from 'src/api/todo/todo.module';
import { TokenModule } from 'src/api/token/token.module';
import { CategoriesModule } from 'src/api/categories/categories.module';

console.log(process.env.POSTGRES_USER);

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    configModule,
    TodoModule,
    CategoriesModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/api/user/user.module';
import { TodoModule } from 'src/api/todo/todo.module';
import { TokenModule } from 'src/api/token/token.module';
import { CategoriesModule } from 'src/api/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'JDAKF032498FFjfs3',
      database: 'nest',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    TodoModule,
    CategoriesModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

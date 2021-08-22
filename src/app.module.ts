import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configModule } from 'configure.root';
import { UserModule } from 'src/api/user/user.module';
import { TodoModule } from 'src/api/todo/todo.module';
import { TokenModule } from 'src/api/token/token.module';
import { CategoriesModule } from 'src/api/categories/categories.module';
import { RightsModule } from 'src/api/rights/rights.module';
import { RolesModule } from './api/roles/roles.module';
import { ScriptModule } from './api/script/script.module';
import { VariableModule } from './api/variable/variable.module';
import { RouterModule } from './api/router/router.module';

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
    RightsModule,
    RolesModule,
    ScriptModule,
    VariableModule,
    RouterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

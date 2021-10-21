import { SupportModule } from './api/support/support.module';
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
import { ChatModule } from './api/chat/chat.module';
import { MessageModule } from './api/message/message.module';
import { StyleModule } from './api/style/style.module';
import { ComponentsAllModule } from './api/components/components-all.module';
import { ContentHtmlModule } from './api/content-html/content-html.module';
import { bdMain } from './config/bd-main';
import { ScheduleModule } from '@nestjs/schedule';
import { DemonModule } from './demon/Demon';
@Module({
  imports: [
    DemonModule,
    SupportModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(bdMain),
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
    ChatModule,
    MessageModule,
    StyleModule,
    ComponentsAllModule,
    ContentHtmlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

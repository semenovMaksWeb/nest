import { Module } from '@nestjs/common';
import { DeleteTokenServer } from './deleteTokenServer';
@Module({
    imports: [],
    providers: [DeleteTokenServer],
  })
  export class DemonModule {}
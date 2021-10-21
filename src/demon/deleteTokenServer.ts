import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { getConnection } from 'typeorm';
@Injectable()
export class DeleteTokenServer {
 constructor(){}

  @Cron("0 00 00 * * 1-5")
  async handleCron() {
     await getConnection()
        .query(
            `DELETE FROM "token" WHERE "token"."id" IN (
            SELECT "token".id FROM "token" WHERE "token"."date" < NOW()
        )`
    );
     console.log("delete token");
     
     
  }
}
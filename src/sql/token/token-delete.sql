DELETE FROM "token" WHERE "token"."id" IN (
  SELECT "token".id FROM "token" WHERE "token"."date" < NOW()
)
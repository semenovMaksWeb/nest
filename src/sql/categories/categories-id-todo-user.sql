-- получить уникальные id что он есть у user в todo или получить null
SELECT DISTINCT "todo_categories"."categoriesId" FROM "user"
JOIN "todo" ON ("todo"."userId" = "user"."id")
JOIN "todo_categories" ON ("todo_categories"."todoId" = "todo"."id")
WHERE ("user"."id" = 1 AND  "todo_categories"."categoriesId" = 1)
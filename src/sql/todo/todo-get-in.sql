-- Получить все todo при условии категории
SELECT * FROM "todo"
LEFT JOIN "todo_categories" ON "todo"."id" = "todo_categories"."todoId"
LEFT JOIN "categories" ON "categories"."id" = "todo_categories"."categoriesId"
WHERE "todo"."id" IN (SELECT DISTINCT "todo"."id" FROM "user"
JOIN "todo" ON ("todo"."userId" = "user"."id")
JOIN "todo_categories" ON ("todo_categories"."todoId" = "todo"."id")
WHERE ("user"."id" = 1 AND  "todo_categories"."categoriesId" = 8)
)
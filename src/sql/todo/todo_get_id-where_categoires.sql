-- ПОлучить ids todo у пользователя с указаной категорией
SELECT DISTINCT "todo"."id" FROM "user"
JOIN "todo" ON ("todo"."userId" = "user"."id")
JOIN "todo_categories" ON ("todo_categories"."todoId" = "todo"."id")
WHERE ("user"."id" = 1 AND  "todo_categories"."categoriesId" = 8)

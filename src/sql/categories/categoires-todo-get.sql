-- Получить todo all
SELECT * FROM "todo"
LEFT JOIN "todo_categories" ON "todo"."id" = "todo_categories"."todoId"
LEFT JOIN "categories" ON "categories"."id" = "todo_categories"."categoriesId"
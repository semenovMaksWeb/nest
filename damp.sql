CREATE TABLE "public.categories" (
	"id" serial NOT NULL,
	"name" character varying NOT NULL,
	"create" TIMESTAMP,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.chat" (
	"id" serial NOT NULL,
	"name" character varying NOT NULL UNIQUE,
	"userId" integer,
	CONSTRAINT "chat_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.chat_user" (
	"chatId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "chat_user_pk" PRIMARY KEY ("chatId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.components" (
	"id" serial NOT NULL,
	"name" character varying NOT NULL UNIQUE,
	"description" character varying NOT NULL,
	CONSTRAINT "components_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.components_content" (
	"id" serial NOT NULL,
	"description" character varying,
	"name" character varying NOT NULL,
	"type_var" character varying,
	"componentsId" integer,
	CONSTRAINT "components_content_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.components_content_example_params" (
	"id" serial NOT NULL,
	"name_params" character varying NOT NULL,
	"value" character varying,
	"type_var" character varying,
	"componentsExampleId" integer,
	"userId" integer,
	"elemId" integer,
	CONSTRAINT "components_content_example_params_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.components_example" (
	"id" serial NOT NULL,
	"description" character varying,
	"name" character varying NOT NULL,
	"componentsId" integer,
	CONSTRAINT "components_example_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.components_var" (
	"id" serial NOT NULL,
	"description" character varying,
	"var_name" character varying NOT NULL UNIQUE,
	"value_default" character varying,
	"componentsId" integer,
	"styleId" integer,
	CONSTRAINT "components_var_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.content_html" (
	"id" serial NOT NULL,
	"content" character varying NOT NULL,
	CONSTRAINT "content_html_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.message" (
	"id" serial NOT NULL,
	"text" character varying NOT NULL,
	"userId" integer,
	"chatId" integer,
	CONSTRAINT "message_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.rights" (
	"id" serial NOT NULL,
	"name" character varying NOT NULL UNIQUE,
	"system" BOOLEAN NOT NULL DEFAULT 'false',
	"description" character varying,
	"create" TIMESTAMP,
	CONSTRAINT "rights_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.roles" (
	"id" serial NOT NULL,
	"name" character varying NOT NULL UNIQUE,
	"description" character varying NOT NULL,
	"visible" BOOLEAN NOT NULL DEFAULT 'true',
	"system" BOOLEAN NOT NULL DEFAULT 'false',
	"create" TIMESTAMP,
	CONSTRAINT "roles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.roles_rights" (
	"rolesId" integer NOT NULL,
	"rightsId" integer NOT NULL,
	CONSTRAINT "roles_rights_pk" PRIMARY KEY ("rolesId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.router" (
	"id" serial NOT NULL,
	"key" character varying NOT NULL UNIQUE,
	"name" character varying NOT NULL,
	"type" character varying NOT NULL,
	"description" character varying NOT NULL,
	"authorization" BOOLEAN NOT NULL,
	"defaultAuthorization" BOOLEAN NOT NULL,
	"checkAdmin" BOOLEAN NOT NULL DEFAULT 'false',
	"usersRolesAll" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "router_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.router_rights" (
	"routerId" integer NOT NULL,
	"rightsId" integer NOT NULL,
	CONSTRAINT "router_rights_pk" PRIMARY KEY ("routerId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.style" (
	"id" serial NOT NULL,
	"description" character varying NOT NULL,
	"name" character varying NOT NULL UNIQUE,
	"typeId" integer,
	CONSTRAINT "style_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.todo" (
	"id" serial NOT NULL,
	"active" BOOLEAN NOT NULL DEFAULT 'true',
	"title" character varying NOT NULL,
	"text" character varying NOT NULL,
	"create" TIMESTAMP,
	"userId" integer,
	CONSTRAINT "todo_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.todo_categories" (
	"todoId" integer NOT NULL,
	"categoriesId" integer NOT NULL,
	CONSTRAINT "todo_categories_pk" PRIMARY KEY ("todoId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.token" (
	"id" serial NOT NULL,
	"value" TEXT NOT NULL UNIQUE,
	"active" BOOLEAN NOT NULL DEFAULT 'true',
	"date" TIMESTAMP NOT NULL,
	CONSTRAINT "token_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.user" (
	"id" serial NOT NULL,
	"active" BOOLEAN NOT NULL DEFAULT 'true',
	"email" character varying NOT NULL UNIQUE,
	"nik" character varying NOT NULL UNIQUE,
	"create" TIMESTAMP,
	"password" character varying NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.user_roles" (
	"userId" integer NOT NULL,
	"rolesId" integer NOT NULL,
	CONSTRAINT "user_roles_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.user_token" (
	"userId" integer NOT NULL,
	"tokenId" integer NOT NULL,
	CONSTRAINT "user_token_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.variable" (
	"id" serial NOT NULL,
	"key" character varying NOT NULL UNIQUE,
	"value" character varying NOT NULL,
	CONSTRAINT "variable_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "chat" ADD CONSTRAINT "chat_fk0" FOREIGN KEY ("userId") REFERENCES "user"("id");

ALTER TABLE "chat_user" ADD CONSTRAINT "chat_user_fk0" FOREIGN KEY ("chatId") REFERENCES "chat"("id");
ALTER TABLE "chat_user" ADD CONSTRAINT "chat_user_fk1" FOREIGN KEY ("userId") REFERENCES "user"("id");


ALTER TABLE "components_content" ADD CONSTRAINT "components_content_fk0" FOREIGN KEY ("componentsId") REFERENCES "components"("id");

ALTER TABLE "components_content_example_params" ADD CONSTRAINT "components_content_example_params_fk0" FOREIGN KEY ("componentsExampleId") REFERENCES "components"("id");
ALTER TABLE "components_content_example_params" ADD CONSTRAINT "components_content_example_params_fk1" FOREIGN KEY ("userId") REFERENCES "user"("id");

ALTER TABLE "components_example" ADD CONSTRAINT "components_example_fk0" FOREIGN KEY ("componentsId") REFERENCES "components"("id");

ALTER TABLE "components_var" ADD CONSTRAINT "components_var_fk0" FOREIGN KEY ("componentsId") REFERENCES "components"("id");
ALTER TABLE "components_var" ADD CONSTRAINT "components_var_fk1" FOREIGN KEY ("styleId") REFERENCES "style"("id");


ALTER TABLE "message" ADD CONSTRAINT "message_fk0" FOREIGN KEY ("userId") REFERENCES "user"("id");
ALTER TABLE "message" ADD CONSTRAINT "message_fk1" FOREIGN KEY ("chatId") REFERENCES "chat"("id");



ALTER TABLE "roles_rights" ADD CONSTRAINT "roles_rights_fk0" FOREIGN KEY ("rolesId") REFERENCES "roles"("id");
ALTER TABLE "roles_rights" ADD CONSTRAINT "roles_rights_fk1" FOREIGN KEY ("rightsId") REFERENCES "rights"("id");


ALTER TABLE "router_rights" ADD CONSTRAINT "router_rights_fk0" FOREIGN KEY ("routerId") REFERENCES "router"("id");
ALTER TABLE "router_rights" ADD CONSTRAINT "router_rights_fk1" FOREIGN KEY ("rightsId") REFERENCES "rights"("id");

ALTER TABLE "style" ADD CONSTRAINT "style_fk0" FOREIGN KEY ("typeId") REFERENCES "style_type"("id");

ALTER TABLE "todo" ADD CONSTRAINT "todo_fk0" FOREIGN KEY ("userId") REFERENCES "user"("id");

ALTER TABLE "todo_categories" ADD CONSTRAINT "todo_categories_fk0" FOREIGN KEY ("todoId") REFERENCES "todo"("id");
ALTER TABLE "todo_categories" ADD CONSTRAINT "todo_categories_fk1" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id");



ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_fk0" FOREIGN KEY ("userId") REFERENCES "user"("id");
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_fk1" FOREIGN KEY ("rolesId") REFERENCES "roles"("id");

ALTER TABLE "user_token" ADD CONSTRAINT "user_token_fk0" FOREIGN KEY ("userId") REFERENCES "user"("id");
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_fk1" FOREIGN KEY ("tokenId") REFERENCES "token"("id");

























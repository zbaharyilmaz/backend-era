CREATE TABLE "blogCategories"(
    "_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "blogCategories" ADD PRIMARY KEY("_id");
ALTER TABLE
    "blogCategories" ADD CONSTRAINT "blogcategories_name_unique" UNIQUE("name");
CREATE TABLE "blogPosts"(
    "_id" BIGINT NOT NULL,
    "categoryId" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "blogPosts" ADD PRIMARY KEY("_id");
ALTER TABLE
    "blogPosts" ADD CONSTRAINT "blogposts_categoryid_foreign" FOREIGN KEY("categoryId") REFERENCES "blogCategories"("_id");
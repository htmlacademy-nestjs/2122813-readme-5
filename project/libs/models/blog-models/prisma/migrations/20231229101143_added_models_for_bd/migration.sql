-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- CreateTable
CREATE TABLE "posts" (
    "post_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "origin_post_id" INTEGER,
    "origin_user_id" TEXT,
    "title" TEXT DEFAULT '',
    "link" TEXT DEFAULT '',
    "announce" TEXT DEFAULT '',
    "description" TEXT DEFAULT '',
    "author" TEXT DEFAULT '',
    "photo" TEXT DEFAULT '',
    "tags" TEXT[],
    "is_repost" BOOLEAN NOT NULL DEFAULT false,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3),
    "type" "PostType" NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);
-- CreateTable
CREATE TABLE "likes" (
    "like_id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("like_id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

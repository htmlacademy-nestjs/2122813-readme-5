import { Subscriber } from "@project/shared/app-types";
import { SendNewsDto } from "../dto/send-news.dto";
import dayjs from "dayjs";

export const getNewPosts = ({ posts, id }: SendNewsDto, { dateNotify }: Subscriber) => posts
  .filter((post) => post.userId !== id && dayjs(post.createdAt).isAfter(dateNotify ?? dayjs().subtract(1, 'day')));

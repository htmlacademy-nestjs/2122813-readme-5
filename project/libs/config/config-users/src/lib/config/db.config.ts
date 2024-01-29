import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface DbConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

export default registerAs('db', (): DbConfig => {
  const config: DbConfig = {
    host: process.env.MONGO_HOST!,
    name: process.env.MONGO_DB!,
    port: parseInt(process.env.MONGO_PORT),
    user: process.env.MONGO_USER!,
    password: process.env.MONGO_PASSWORD!,
    authBase: process.env.MONGO_AUTH_BASE!,
  };

  const validationSchema = Joi.object<DbConfig>({
    host: Joi.string().hostname().required(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[DB Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});

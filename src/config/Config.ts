import MySql from "./MySql";
interface Config {
  APP_ENV: string | undefined;
  ENVIRONMENT: string | undefined;
  PORT: number | undefined;
  DATABASE: MySql;
  JWT_SECRET_KEY: string | undefined;
}

export default Config;

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.normalize(path.join(path.dirname(__dirname) + "/../.env")) });

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    rtSecret: process.env.REFRESH_SECRET,
    atSecret: process.env.ACCESS_SECRET,
    tokenLife: process.env.TOKEN_LIFE,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "storeroom_database_test",
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

const env = process.env.NODE_ENV || "development";
//@ts-expect-error
const configuration = config[env];
export { configuration };

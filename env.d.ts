declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_HOST: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_PORT: string;
      NODE_ENV: string;
      REFRESH_SECRET: string;
      ACCESS_SECRET: string;
      TOKEN_LIFE: string;
    }
  }
}

export {}

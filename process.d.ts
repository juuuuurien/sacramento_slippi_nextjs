declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXT_URL_DEV: string;
    NEXT_URL_PROD: string;
    CRON_KEY: string;
  }
}

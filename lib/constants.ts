export const appUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_URL_PROD
    : process.env.NEXT_URL_DEV;

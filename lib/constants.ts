export const appUrl =
  process.env.NODE_ENV === "production"
    ? process.env.VERCEL_URL
    : process.env.NEXT_URL_DEV;

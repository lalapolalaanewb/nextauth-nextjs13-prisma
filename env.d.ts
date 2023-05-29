declare namespace NodeJS {
  export interface ProcessEnv {
    /* Server environment */
    HOST: string;
    PORT: number;
    /**
     * The allowed values for NODE_ENV are development, production, and test.
     * {@link https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order}
     */
    ENV_BRANCH: "dev" | "staging" | "production";
    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_EXCLUDE_LIST: string;

    /* Test Paraphrase */
    NEXT_PUBLIC_TEST_PASSPHRASE: string;
    NEXT_PUBLIC_TEST_PASSPHRASE2: string;

    /* Redis */
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;

    /* Mailer */
    MAIL_CLIENT: string;
    MAIL_CLIENT_ID: string;
    MAIL_CLIENT_SECRET: string;
    MAIL_REFRESH_TOKEN: string;

    /* Trpc */
    VERCEL_URL: string;

    /* NextAuth.js */
    /**
     * {@link https://next-auth.js.org/configuration/options#nextauth_url}
     */
    NEXTAUTH_URL: string;
    /**
     * {@link https://next-auth.js.org/configuration/options#nextauth_secret}
     */
    NEXTAUTH_SECRET: string;
    /**
     * {@link https://next-auth.js.org/configuration/options#nextauth_url_internal}
     */
    NEXTAUTH_INTERNAL?: string;

    /* Geo API */
    NEXT_PUBLIC_GEO_API: string;

    /* Dev Access */
    NEXT_PUBLIC_DEV_ACCESS_SECRET: string;
    NEXT_PUBLIC_DEV_ACCESS_LIST: string;

    /* MongoDB */
    MONGODB_URI: string;
    MONGO_ROOT_USERNAME: string;
    MONGO_ROOT_PASSWORD: string;
  }
}

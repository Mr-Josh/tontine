// const requiredEnv = (name: string): string => {
//   const value = process.env[name];

//   if (!value) {
//     throw new Error(`${name} is not configured`);
//   }

//   return value;
// };

export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),

  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    name: process.env.DB_NAME ?? 'tontine',
    user: process.env.DB_USER ?? 'tontine',
    password: process.env.DB_PASSWORD ?? '',
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  },
});

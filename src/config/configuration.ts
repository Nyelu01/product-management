export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USERNAME,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
});

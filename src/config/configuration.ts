export default () => ({
  app_port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres',
    // host: 'localhost',
    host: process.env.DATABASE_HOST,
    //port: parseInt(process.env.DATABASE_PORT) || 5432,
    //port: 5432,
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    //username: 'postgres',
    username: process.env.DATBASE_USER,
    password: '',
    //database: 'db_nest',
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true, // es de nestjs
    synchronize: true, // solo para desarrollo, de nestjs
    retryDelay: 3000,
    retryAttempts: 10,
  },
});

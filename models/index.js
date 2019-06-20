import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MONGO_INITDB_ROOT_USERNAME);
console.log(process.env.POSTGRES_DB);
console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_PASSWORD);

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    dialect: 'postgres',
  }
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;

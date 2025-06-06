import fs from 'fs';
import path from 'path';
import process from 'process';
import { Sequelize, DataTypes } from 'sequelize';
import url from 'url';

import configJSON from '../config/config.js'; // import config.js trực tiếp

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = configJSON[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = (await fs.promises.readdir(__dirname)).filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  );
});

for (const file of files) {
  // Chuyển đường dẫn Windows thành URL chuẩn file:// cho import()
  const filePath = url.pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(filePath);
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

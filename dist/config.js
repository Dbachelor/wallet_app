

import { config } from "dotenv";
config();
const defaults = {
  password: process.env.PASSWORD,
  secret_key: process.env.SECRET_KEY,
  port: process.env.PORT,
};

export {defaults}


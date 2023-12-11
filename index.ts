import dotenv from "dotenv";
import express, {Express} from "express";
import dbConfig from "./src/config/db";
import http from "http";

import router from "./src/routes/user";

//import cms from './src/routes/user'

dotenv.config();
const app:Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dbConfig(process.env.ATLAS_URL, process.env.LOCAL_URL, process.env.DB_NAME);
router(app)
const httpServer = http.createServer(app);

//app.use('', cms);

  
httpServer.listen(process.env.PORT, () => {
console.log(`HTTP Server is running on port ${process.env.PORT}`);
 });
 

 
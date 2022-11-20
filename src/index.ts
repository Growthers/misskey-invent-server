import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import CheckEmail from "./checkEmail";
import {
   LoadJson,
   WriteJson,
   CheckExistEmail,
   AddNewEmailAddr,
} from "./dbUtils";

const App = () => {
   // 環境変数読み込み
   dotenv.config();
   const serverPort = process.env.SERVER_PORT;
   if (serverPort === undefined) {
      console.error(".envにSERVER_PORTを設定してください");
      process.exit(1);
   }

   LoadJson();

   const app = express();
   app.use(cors());
   app.use(express.json());

   app.post("/api/v1/request", CheckEmail);

   app.listen(serverPort, () => {
      console.log("Start Misskey Invent Server");
   });

   process.on("SIGTERM", () => {
      WriteJson();
      console.log("Process terminated.");
   });
};

App();

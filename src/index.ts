import express from "express";
import dotenv from "dotenv";
import CheckEmail from "./checkEmail";

const App = () => {
   //環境変数読み込み
   dotenv.config();
   const serverPort = process.env.SERVER_PORT;
   if (serverPort === undefined) {
      console.error("Please set SERVER_PORT in .env");
      process.exit(1);
   }
   const app = express();
   app.post("/api/v1/request", CheckEmail);
   app.listen(serverPort, () => {
      console.log("Start Misskey Invent Server");
   });

};

App();

import { Request, Response } from "express";
import { getMisskeyInviteCode } from "./getMisskeyInviteCode";
import { sendEmail } from "./sendEmail";
import {checkEmailAddr} from "./checkEmailDomain";


type ResponseStatus = {
   status: "OK" | "NG" | "ERR";
};
const CheckEmail = async (req: Request, res: Response) => {
   const { email } = req.body;

   if (email === null || email === undefined) {
      const data: ResponseStatus = {
         status: "ERR",
      };
      res.status(400).send(data);
      return;
   }
   console.log(email);

   // メールアドレスの正規表現
   const regex = /[\w\-\._]+@[\w\-\._]+\.[A-Za-z]+/;
   if (!regex.test(email)) {
      const data: ResponseStatus = {
         status: "NG",
      };
      res.send(data);
   }

   if (!checkEmailAddr(email)){
      const data: ResponseStatus = {
         status: "NG",
      };
      res.send(data);
   }


   const code = await getMisskeyInviteCode();
   const r = sendEmail(email, code)
   
   if (!r) {
      const data: ResponseStatus = {
         status: "ERR"
      };
      res.send(data)
      return;
   }

   const data: ResponseStatus = {
      status: "OK",
   };
   res.send(data);
   return;

};

export default CheckEmail;

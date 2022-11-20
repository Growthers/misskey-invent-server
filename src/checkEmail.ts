import { Request, Response } from "express";
import getMisskeyInviteCode  from "./getMisskeyInviteCode";
import sendEmail from "./sendEmail";
import checkEmailAddr from "./checkEmailDomain";


type ResponseStatus = {
   status: "OK" | "NG" | "ERR";
};
const CheckEmail = async (req: Request, res: Response) => {
   const { email } = req.body;

   if (email === null || email === undefined) {
      const data: ResponseStatus = {
         status: "ERR",
      };
      return res.status(400).send(data);
   }
   console.log(email);

   // メールアドレスの正規表現
   const regex = /[\w\-\._]+@[\w\-\._]+\.[A-Za-z]+/;
   if (!regex.test(email)) {
      const data: ResponseStatus = {
         status: "NG",
      };
      return res.status(400).send(data);
   }

   if (!checkEmailAddr(email)){
      const data: ResponseStatus = {
         status: "NG",
      };
      return res.status(400).send(data);
   }


   const code = await getMisskeyInviteCode();
   const r = sendEmail(email, code)
   
   if (!r) {
      const data: ResponseStatus = {
         status: "ERR"
      };
      return res.status(400).send(data);
      
   }

   const data: ResponseStatus = {
      status: "OK",
   };
   return res.status(200).send(data);
};

export default CheckEmail;

import { Request, Response } from "express";
import getMisskeyInviteCode from "./getMisskeyInviteCode";
import sendEmail from "./sendEmail";
import checkEmailAddr from "./checkEmailDomain";
import { AddNewEmailAddr, CheckExistEmail } from "./dbUtils";

type ResponseStatus = {
   status: "ERR" | "OK" | "NG";
   message?: "UNAUTHORIZED_DOMAIN" | "EXIST_EMAIL" | "BAD_FORMAT";
};
const CheckEmail = async (req: Request, res: Response) => {
   const { email } = req.body;

   if (email === null || email === undefined) {
      const data: ResponseStatus = {
         status: "ERR",
      };
      return res.status(400).send(data);
   }

   // メールアドレスの正規表現
   // eslint-disable-next-line no-useless-escape
   const regex = /[\w\-\._]+@[\w\-\._]+\.[A-Za-z]+/;
   if (!regex.test(email)) {
      console.log("this email address is broken");
      const data: ResponseStatus = {
         status: "NG",
         message: "BAD_FORMAT",
      };
      return res.status(400).send(data);
   }

   if (!checkEmailAddr(email)) {
      console.log("this email address is not kosen ");
      const data: ResponseStatus = {
         status: "NG",
         message: "UNAUTHORIZED_DOMAIN",
      };
      return res.status(400).send(data);
   }

   if (CheckExistEmail(email)) {
      console.log("this email address is exist");
      const data: ResponseStatus = {
         status: "NG",
         message: "EXIST_EMAIL"
      };
      return res.send(data);
   }

   const code = await getMisskeyInviteCode();
   const r = sendEmail(email, code);

   if (!r) {
      const data: ResponseStatus = {
         status: "ERR",
      };
      return res.status(400).send(data);
   }

   AddNewEmailAddr(email);
   const data: ResponseStatus = {
      status: "OK",
   };
   return res.status(200).send(data);
};

export default CheckEmail;

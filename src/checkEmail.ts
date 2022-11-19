import { Request, Response } from "express";
import { getMisskeyInviteCode } from "./getMisskeyInviteCode";
import {sendEmail} from "./sendEmail";

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

   // 正規表現で登録可能なメールアドレスを確認
   const regex = /\w{1,64}\.kosen-ac\.jp/;

   if (regex.test(email)) {
      const code = await getMisskeyInviteCode();
      const r = sendEmail(email, code)
      if (!r) {
        const data:ResponseStatus = {
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
   }

   const data: ResponseStatus = {
      status: "NG",
   };
   res.send(data);
};

export default CheckEmail;

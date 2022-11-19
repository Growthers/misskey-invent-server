import { Request, Response } from "express";
import { getMisskeyInviteCode } from "./getMisskeyInviteCode";

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
   // この配列に正規表現を登録する
   const regexs = [/\w{1,64}\.kosen-ac\.jp/];

   // eslint-disable-next-line no-restricted-syntax
   for (const reg of regexs) {
      if (reg.test(email)) {
         // eslint-disable-next-line no-await-in-loop
         console.log(await getMisskeyInviteCode());
         const data: ResponseStatus = {
            status: "OK",
         };
         res.send(data);
         return;
      }
   }

   /*
    */

   const data: ResponseStatus = {
      status: "NG",
   };
   res.send(data);
};

export default CheckEmail;

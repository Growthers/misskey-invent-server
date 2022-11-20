import Mailgun from "mailgun.js";
import formData from "form-data";

export default async function sendEmail(addr: string, code: string) {
   const MAIL_USER: string = process.env.MAIL_USER ?? "none";
   const MAIL_KEY: string = process.env.MAIL_KEY ?? "none";
   const MAIL_DOMAIN: string = process.env.MAIL_DOMAIN ?? "none";
   const mailgun = new Mailgun(formData);

   if (MAIL_USER === "none" || MAIL_KEY === "none" || MAIL_DOMAIN === "none") {
      console.error(
         "メール送信設定がされていません",
         MAIL_USER,
         MAIL_KEY,
         MAIL_DOMAIN
      );
      return;
   }

   const cli = mailgun.client({ username: MAIL_USER, key: MAIL_KEY });

   try {
      await cli.messages.create(MAIL_DOMAIN, {
         from: "mi.kosen.land 運営チーム <kosenland-admin@mail.laminne33569.net>",
         to: [addr],
         subject: "mi.kosen.land 招待コードをお送りします",
         text: `mi.kosen.land 運営チームです。\n
あなたのメールアドレスを確認しましたので、招待コードをお送りします。\n
このコードは1回のみ、あなたのみ使用可能です。\n
招待コード: ${code}\n\n
https://mi.kosen.land/ にアクセスして、登録を完了してください。\n
このメールアドレスは送信専用ですので返信しないでください。`,
      });
   } catch (e) {
      console.log("error:", e);
      throw e;
   }
}

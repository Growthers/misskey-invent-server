import nodemailer, { TransportOptions, SendMailOptions } from "nodemailer";
const SendEmailFromNodemailer = async (emailAddr: string, code: string) => {
   const MAIL_USER: string = process.env.MAIL_USER ?? "none";
   const MAIL_DOMAIN: string = process.env.MAIL_DOMAIN ?? "none";
   if (MAIL_USER === "none" || MAIL_DOMAIN === "none") {
      console.error("メール送信設定がされていません", MAIL_USER, MAIL_DOMAIN);
      return;
   }

   const transportOption: TransportOptions = {};
   const mailOption: SendMailOptions = {};

   const transporter = nodemailer.createTransport(transportOption);
   try {
      await transporter.sendMail(mailOption);
   } catch (e) {
      console.error("error", e);
      throw e;
   }
};

export default SendEmailFromNodemailer;

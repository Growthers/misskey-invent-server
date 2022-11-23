import MailGun from "./mail/mailgun";
import { EmailSender, IMailer, Mail } from "./mail/mailerService";
import SES from "./mail/ses";

export default async function sendEmail(emailAddr: string, inviteCode: string) {
   // default use mailgun.
   const mailService = process.env.MAIL_SERVICE ?? "";
   const mailFrom = process.env.MAIL_FROM ?? "";
   if (mailFrom === "") {
      console.log("MAIL_FROM is not set in .env");
      return;
   }

   const [mailUser, mailKey, mailDomain] = [
      process.env.MAIL_USER ?? "",
      process.env.MAIL_KEY ?? "",
      process.env.MAIL_DOMAIN ?? "",
   ];

   const [smtpUser, smtpPassword, smtpEndpoint, smtpPort] = [
      process.env.SMTP_USER ?? "",
      process.env.SMTP_PASSWORD ?? "",
      process.env.SMTP_ENDPOINT ?? "",
      process.env.SMTP_PORT ?? "",
   ];
   const body: Mail = {
      from: mailFrom,
      to: emailAddr,
      subject: "kosen.landへようこそ",
      text: `mi.kosen.land 運営チームです。\n
      あなたのメールアドレスを確認しましたので、招待コードをお送りします。\n
      このコードは1回のみ、あなたのみ使用可能です。\n
      招待コード: ${inviteCode}\n\n
      https://mi.kosen.land/ にアクセスして、登録を完了してください。\n
      このメールアドレスは送信専用ですので返信しないでください。`,
   };

   // send email
   if (
      mailService === "" ||
      mailService === "mailgun" ||
      mailService === "MAILGUN"
   ) {
      // check env
      if (mailKey === "" || mailUser === "" || mailDomain === "") {
         console.log("MAIL_USER", mailUser);
         console.log("MAIL_KEY", mailKey);
         console.log("MAIL_DOMAIN", mailDomain);
         return;
      }

      const mailgun: IMailer = new MailGun(mailKey, mailUser, mailDomain);
      await EmailSender(mailgun, body);
   } else if (mailService === "ses" || mailService === "SES") {
      // check env
      if (
         smtpUser === "" ||
         smtpPassword === "" ||
         smtpEndpoint === "" ||
         smtpPort === ""
      ) {
         console.log("SMTP_USER", smtpUser);
         console.log("SMTP_PASSWORD", smtpPassword ? "****" : "");
         console.log("SMTP_USER", smtpUser);
         console.log("SMTP_PORT", smtpUser);
         return;
      }

      const ses: IMailer = new SES(
         smtpUser,
         smtpPassword,
         smtpEndpoint,
         parseInt(smtpPort, 10)
      );
      await EmailSender(ses, body);
   }
}

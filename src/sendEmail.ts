import {MailGun} from "./mail/mailgun";
import {emailSender, IMailer, mail} from "./mail/mailerService"

export default async function sendEmail(emailAddr: string, inviteCode: string) {
   const [mailUser, mailKey, mailDomain] = [
      process.env.MAIL_USER ?? "",
      process.env.MAIL_KEY ?? "",
      process.env.MAIL_DOMAIN ?? ""
   ]
   const body:mail = {
      from: "admin@kosen.land",
      to: emailAddr,
      subject: "kosen.landへようこそ",
      text: `mi.kosen.land 運営チームです。\n
      あなたのメールアドレスを確認しましたので、招待コードをお送りします。\n
      このコードは1回のみ、あなたのみ使用可能です。\n
      招待コード: ${inviteCode}\n\n
      https://mi.kosen.land/ にアクセスして、登録を完了してください。\n
      このメールアドレスは送信専用ですので返信しないでください。`
   }

   const mailgun: IMailer = new MailGun(mailKey, mailUser, mailDomain);

   await emailSender(mailgun, body);
}

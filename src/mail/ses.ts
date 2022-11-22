import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
import { IMailer, Mail } from "./mailerService";

export default class SES implements IMailer {
   private password: string;

   private name: string;

   private endpoint: string;

   private port: number;

   private transporter: Transporter;

   constructor(
      smtpUser: string,
      smtpPass: string,
      smtpEndpoint: string,
      port: number
   ) {
      if (
         smtpUser === "" ||
         smtpPass === "" ||
         smtpEndpoint === "" ||
         Number.isNaN(port)
      ) {
         console.log("SMTP_USER", smtpUser);
         console.log("SMTP_PASSWORD");
         console.log("SMTP_USER", smtpUser);
         console.log("SMTP_USER", smtpUser);
      }

      this.name = smtpUser;
      this.password = smtpPass;
      this.endpoint = smtpEndpoint;
      this.port = port;

      this.transporter = nodemailer.createTransport({
         host: this.endpoint,
         port: this.port,
         secure: false,
         requireTLS: true,
         auth: {
            user: this.name,
            pass: this.password,
         },
      });
   }

   async Send(body: Mail): Promise<boolean> {
      const mailOption: SendMailOptions = {
         from: body.from,
         to: body.to,
         subject: body.subject,
         text: body.text,
      };
      try {
         await this.transporter.sendMail(mailOption);
      } catch (e) {
         console.error("Cannnot send Email on SES");
         throw e;
      }
      return false;
   }
}

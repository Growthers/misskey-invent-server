import { IMailer, mail } from "./mailerService";
import Mailgun from "mailgun.js";
import formData from "form-data";
import Client from "mailgun.js/client";

export class MailGun implements IMailer {
    private key: string;
    private name: string;
    private domain: string;
    private cli: Client;

    constructor(mailKey: string, userName: string, domain: string) {
        this.key = mailKey;
        this.name = userName;
        this.domain = domain;

        const mailgun = new Mailgun(formData);
        this.cli = mailgun.client({ username: this.name, key: this.key });
    }

    async Send(body: mail): Promise<boolean> {
        try {
            await this.cli.messages.create(this.domain, {
               from: body.from,
               to: [body.to],
               subject: body.subject,
               text: body.text,
            });
         } catch (e) {
            console.log("error:", e);
            throw e;
         }
        return true
    }
}

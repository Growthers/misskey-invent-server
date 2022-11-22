export interface IMailer {
    Send(body: Mail):Promise<boolean>
};

export type Mail = {
    from: string;
    to: string;
    subject: string;
    text: string;
};

export async function EmailSender(mailer: IMailer, body: Mail) {
    await mailer.Send(body);
}

export interface IMailer {
    Send(body: mail):Promise<boolean>
};

export type mail = {
    from: string;
    to: string;
    subject: string;
    text: string;
};

export async function emailSender(mailer: IMailer, body: mail) {
    await mailer.Send(body);
}

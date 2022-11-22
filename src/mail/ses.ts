import { IMailer, mail } from "./mailerService";

export class SES implements IMailer {
    private KEY: string;
    private NAME: string;

    constructor(acctKey: string, acctName: string) {
        this.KEY = acctKey;
        this.NAME = acctName;
    };

    async Send(body: mail): Promise<boolean> {
        return false
    };
}

import emailDomainList from "./domainList";
// true: 高専のメールアドレス
export default function checkEmailAddr(addr: string): boolean {
    // ドメイン部をリストと照合
    /* eslint-ignore */
    let res:boolean=false;
    for (let i=0; i < emailDomainList().length; i+=1) {
        res = addr.split("@")[1].endsWith(emailDomainList()[i]);
        if (res) {
            return res;
        }
    };
    return res
}

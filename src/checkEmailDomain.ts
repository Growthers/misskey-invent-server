import {emailDomainList} from "./domainList";
// true: 高専のメールアドレス
export function checkEmailAddr(addr: string):boolean {
    // ドメイン部をリストと照合
    for (let v of emailDomainList) {
        if (addr.split("@")[1] === v) {
            return true
        }
    }
    return false;
 }
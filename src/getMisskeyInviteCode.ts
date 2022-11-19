import axios from "axios"

export async function getMisskeyInviteCode (){
    if (!process.env.MISSKEY_FQDN || !process.env.MISSKEY_TOKEN){
        console.error("トークンまたはFQDNが設定されていません")
        return "";
    }
    const res = await axios.post(`https://${process.env.MISSKEY_FQDN}/api/admin/invite`, {"i": process.env.MISSKEY_TOKEN});
    return res.data.code;
}

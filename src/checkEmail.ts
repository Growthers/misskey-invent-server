import { getMisskeyInviteCode } from "./getMisskeyInviteCode";
import {sendEmail} from "./sendEmail";

const CheckEmail = async () => {
   console.log("called");
   const code = await getMisskeyInviteCode();
   console.log(code);
   sendEmail("", code)
};

export default CheckEmail;

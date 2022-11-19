import { getMisskeyInviteCode } from "./getMisskeyInviteCode";

const CheckEmail = async () => {
   console.log("called");
   console.log(await getMisskeyInviteCode());
};

export default CheckEmail;

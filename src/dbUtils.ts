import fs from "fs";

type JsonDataType = {
   existEmail: string[];
};

let jsonData: JsonDataType;
let oldExistCount = 0;

const LoadJson = () => {
   const dbFilePath = process.env.EMAIL_DATA;
   if (!dbFilePath) {
      console.log(".envにEMAIL_DATAを設定してください");
      process.exit(1);
   }

   jsonData = JSON.parse(fs.readFileSync(dbFilePath, "utf8")) as JsonDataType;
   oldExistCount = jsonData.existEmail.length;
   console.log(jsonData.existEmail);
};

const WriteJson = () => {
   const dbFilePath = process.env.EMAIL_DATA;
   if (!dbFilePath) {
      console.log(".envにEMAIL_DATAを設定してください");
      process.exit(1);
   }

   const data = JSON.stringify(jsonData);

   fs.writeFile(dbFilePath, data, (err) => {
      if (err) {
         console.log(`${dbFilePath}への書き込みに失敗しました`);
         throw err;
      }
   });
};

// jsonDataにemailAddressが存在するかを確認
const CheckExistEmail = (emailAddress: string): boolean => {
   const flag = jsonData.existEmail.includes(emailAddress);

   return flag;
};

// emailAddressを新規登録
const AddNewEmailAddr = (emailAddress: string) => {
   const nowExistEmailCout = jsonData.existEmail.push(emailAddress);
   if (nowExistEmailCout > oldExistCount + 10) {
      WriteJson();
   }
};

export { LoadJson, WriteJson, CheckExistEmail, AddNewEmailAddr };

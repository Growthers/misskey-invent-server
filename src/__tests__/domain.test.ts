import { checkEmailAddr } from "../checkEmailDomain";

describe("ドメイン名を正しく判定できるか", () => {
   test("リストに無いものは弾く", () => {
      expect(checkEmailAddr("j9988@saga-ct.ac.jp")).toBe(false);
   });

   test("リストにあるものはOKにする", () => {
      expect(checkEmailAddr("i22369@gunma-ct.ac.jp")).toBe(true);
   });
});

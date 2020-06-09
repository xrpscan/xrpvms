import dotenv from "dotenv";
import fs from "fs";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
const SIGNING_ALGORITHM = "RS256";
const SIGNING_PRIVATE_KEY = process.env.XRPVMS_SIGNING_KEY;
const privateKey = fs.readFileSync(`${process.cwd()}/pki/${SIGNING_PRIVATE_KEY}`);

export const sign = (payload: object): string => {
  return jsonwebtoken.sign(payload, privateKey, { algorithm: SIGNING_ALGORITHM });
};

export const verify = async (payload: string, publicKey: string) => {
  console.log("[TODO] Verification OK");
};

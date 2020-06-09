// import RippleAPI from "ripple-lib";
import dotenv from "dotenv";
import redisclient from "./redis";

const { RippleAPI } = require("ripple-lib");
dotenv.config();

const xrpl = new RippleAPI({ server: process.env.RIPPLED_WEBSOCKET });

xrpl
  .connect()
  .then(() => {})
  .catch((error: any) => {
    console.error(error);
  });

xrpl.on("connected", () => {
  console.log(`Connected to XRPL`);
  xrpl.request("subscribe", { streams: ["validations"] }).catch((error: any) => {
    console.error(`[ERROR] Validation stream subscription failed: ${error}`);
  });
});

xrpl.on("disconnected", (code: number) => {
  console.log(`Disconnected from rippled. Code: ${code}`);
});

xrpl.on("error", (code: number, message: string) => {
  console.error(`rippled error: ${code}: ${message}`);
});

/**
 * Subscribe to validation stream and listen to validationReceived messages.
 */
xrpl.connection.on("validationReceived", (vm: any) => {
  if (vm.master_key || vm.validation_public_key) {
    const VM_KEY = vm.master_key || vm.validation_public_key;
    redisclient.hset(`l:${vm.ledger_index}`, VM_KEY, JSON.stringify(vm), () => {});
  }
});

export default xrpl;

import express, { Request, Response, NextFunction, Router } from "express";
import redisclient from "../lib/redis";
import { sign } from "../lib/pki";

const ValidationController: Router = express.Router();

ValidationController.use("/:ledger_index", (req: Request, res: Response, next: NextFunction) => {
  req.ledger_index = req.params.ledger_index;
  if (req.ledger_index) {
    redisclient.hgetall(`l:${req.ledger_index}`, (err, messages) => {
      if (!err && messages) {
        req.messages = messages;
        next();
      } else {
        return res.status(404).send("Error");
      }
    });
  } else {
    return res.status(404).send("Not found");
  }
});

ValidationController.route("/:ledger_index").get((req: Request, res: Response) => {
  return res.status(200).send(sign(req.messages));
});

ValidationController.route("/:ledger_index/raw").get((req: Request, res: Response) => {
  return res.status(200).send(req.messages);
});

export default ValidationController;

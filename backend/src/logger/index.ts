import { Request, Response, NextFunction } from "express";
export const Logger = {
  requestListener(req: Request, resp: Response, next: NextFunction) {
    console.info(`${req.method} -> ${req.url}`);
    if (req.method !== "GET") console.log(req.body);

    next();
  },
};

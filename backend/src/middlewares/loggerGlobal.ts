import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const date = new Date();
  const fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(
    `Estas ejecutando el metodo ${req.method}, en la ruta ${req.url}, el dia ${fecha} a las ${time}`,
  );
  next();
}

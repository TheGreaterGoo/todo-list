import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;

const todoList : string[] = [];

export const setList = (req: SafeRequest, res: SafeResponse): void => {
    if (req.body.todoList !== undefined && Array.isArray(req.body.todoList)) {
      const newList : string[] = []
      for (const item of req.body.todoList) {
        if (typeof item !== "string") {
          throw Error(`item is not a string: ${typeof item}`);
        }
        newList.push(item);
      }
        todoList.length = 0;
        todoList.push(...newList);
        res.send({saved: true});
    } else {
        res.status(400).send('missing or invalid todo list in PUT body');
    }
}

export const getList = (_req: SafeRequest, res: SafeResponse): void => {
  res.send({todoList: todoList})
}

const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};
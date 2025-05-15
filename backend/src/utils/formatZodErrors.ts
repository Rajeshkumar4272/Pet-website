import { ZodError } from "zod";

export const formatZodErrors = (errors: ZodError[]) => {
  return errors.map((error: any) => ({ [error.path[0]]: error.message }));
};

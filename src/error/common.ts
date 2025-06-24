import { IGenericErrorMessage } from "../interfaces/error";


export type IGenericErrorResponse = {
  statusCode: number ;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

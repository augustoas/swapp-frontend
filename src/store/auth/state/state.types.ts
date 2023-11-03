import { AxiosError } from "axios";

// import { InputData as ProductBlendRulesInputData } from '@/components/DailyPlanning/QualityInputs/ProductBlendRules';

export enum Errors {
  SIGNIN_ERROR = "signInError",
}

export type IUser = {
  firstname: string;
  lastname: string;
  email: string;
  gender?: string;
  resetToken?: string;
  resetTokenExpiration?: string;
  birthdate?: Date;
};

export type IAuth = {
  auth?: IUser;
  token?: string;
};

export type Error = {
  error: string;
  message: string;
};

export type State = {
  auth: IAuth;
  authenticated: boolean;
  error: Error;
};

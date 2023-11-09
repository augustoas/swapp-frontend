import { AxiosError } from "axios";

// import { InputData as ProductBlendRulesInputData } from '@/components/DailyPlanning/QualityInputs/ProductBlendRules';

export enum Errors {
  SIGNIN_ERROR = "signInError",
  SIGNUP_ERROR = "signUpError",
}

export type IUser = {
  firstname?: string;
  lastname?: string;
  email: string;
  gender?: string;
  resetToken?: string;
  resetTokenExpiration?: string;
  birthdate?: Date;
};

export type IAuth = {
  user?: IUser;
  token?: string;
};

export type Error = {
  error: string;
  message: string;
};

export type State = {
  auth: IAuth;
  authenticated: boolean;
  authEmail: string;
  error: Error;
};

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
  jobInProgress: any; // UPDATE WITH CORRESPONDING JOB TYPE.
  error: Error;
};

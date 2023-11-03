type ActionReturnType<T = void> = Promise<T>;

export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = {
  firstname: string;
  lastname: string;
  emil: string;
  password: string;
};

export type ActionsSignatures = {
  signIn: (data: SignIn) => ActionReturnType;
  signUp: (data: SignUp) => ActionReturnType;
};

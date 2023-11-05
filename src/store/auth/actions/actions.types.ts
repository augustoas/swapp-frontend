type ActionReturnType<T = void> = Promise<T>;

export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ActionsSignatures = {
  signIn: (data: SignIn) => ActionReturnType;
  signUp: (data: SignUp) => ActionReturnType;
};

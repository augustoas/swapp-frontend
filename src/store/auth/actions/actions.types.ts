export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export type ActionsSignatures = {
  signIn: (data: SignIn) => Promise<boolean>;
  signUp: (data: SignUp) => Promise<boolean>;
  signOut: () => Promise<boolean>;
};

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

export type AuthToken = {
  token: string;
};

export type JobInProgressPayload = unknown; // Replace 'unknown' with the actual type

export type ActionsSignatures = {
  signIn: (data: SignIn) => Promise<boolean>;
  signUp: (data: SignUp) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  authenticate: (data: AuthToken) => Promise<boolean>;
  jobInProgress: (data: JobInProgressPayload) => Promise<boolean>;
  resetError: () => Promise<boolean>;
};

type ActionReturnType<T = void> = Promise<T>;

export type ActionsSignatures = {
  login: () => ActionReturnType;
  logout: () => ActionReturnType;
};

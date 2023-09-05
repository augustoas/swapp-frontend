import { AxiosError } from "axios";

// import { InputData as ProductBlendRulesInputData } from '@/components/DailyPlanning/QualityInputs/ProductBlendRules';

export enum Errors {
  LOGIN_ERROR = "loginError",
}

export type State = {
  account: any;
  accessToken: string | null;
  authenticated: boolean;
  errors: Record<Errors, AxiosError | null>;
};

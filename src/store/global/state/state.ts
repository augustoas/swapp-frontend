import { State } from "./state.types";

const defaultState = () =>
  ({
    currentTab: 0 as State["currentTab"],
  } as State);

const state = defaultState();

export default state;

export { defaultState };

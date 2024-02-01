// Define the type for the payload of the setCurrentTab action
export type SetCurrentTabPayload = {
  tab: string;  // Assuming the payload is an object with a string property 'tab'
};

// Define the type for the actions' signatures
export type ActionsSignatures = {
  setCurrentTab: (payload: SetCurrentTabPayload) => Promise<void>;
};

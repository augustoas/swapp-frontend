import {
  validateMinimumCaracters,
  validateNumberBetweenRange,
} from "@/utils/validations";

export const validateDescription = (description: string) => {
  const descriptionResult = validateMinimumCaracters(
    description,
    10,
  );

  if (descriptionResult.errors.length > 0) {
    const errorMessage = descriptionResult.errors;
    return errorMessage;
  }

  return false;
};

export const validateDate = (dateType: number | null, date: string) => {
  if (!date && dateType !== 3) {
    const errorMessage = ["Debe elegir una opción de fecha."];
    return errorMessage;
  }

  return false;
};

export const validateLocation = (remote: boolean, location: string) => {
  if (!location && !remote) {
    const errorMessage = ["Debe indicar dirección válida."];
    return errorMessage;
  }

  return false;
};

export const validateDetails = (details: string) => {
  const detailsResult = validateMinimumCaracters(details, 25);

  if (detailsResult.errors.length > 0) {
    const errorMessage = detailsResult.errors;
    return errorMessage;
  }

  return false;
};

export const validateBudget = (rawBudget: number) => {
  const budgetResult = validateNumberBetweenRange(
    rawBudget,
    "2.000",
    "999.999",
    "Monto"
  );

  if (budgetResult.errors.length > 0) {
    const errorMessage = budgetResult.errors;
    return errorMessage;
  }

  return false;
};

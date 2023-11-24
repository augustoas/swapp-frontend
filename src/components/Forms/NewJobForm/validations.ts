import {
  validateMinimumCaracters,
  validateNumberBetweenRange,
} from "@/utils/validations";

export const validateDescription = (description: string) => {
  const descriptionResult = validateMinimumCaracters(
    description,
    10,
    "Descripción"
  );

  if (descriptionResult.errors.length > 0) {
    const errorMessage = descriptionResult.errors;
    return errorMessage;
  }

  return false;
};

export const validateDate = (
  flexible: boolean,
  taskDate: boolean,
  taskBeforeDate: boolean
) => {
  if (!flexible && !taskDate && !taskBeforeDate) {
    const errorMessage = ["Debe elegir una opción de fecha."];
    return errorMessage;
  }

  return false;
};

export const validateLocation = (online: boolean, location: string) => {
  if (location === "" && !online) {
    const errorMessage = ["Debe indicar dirección válida."];
    return errorMessage;
  }

  return false;
};

export const validateDetails = (details: string) => {
  const detailsResult = validateMinimumCaracters(details, 25, "Detalles");

  if (detailsResult.errors.length > 0) {
    const errorMessage = detailsResult.errors;
    return errorMessage;
  }

  return false;
};

export const validateBudget = (rawBudget: number) => {
  const budgetResult = validateNumberBetweenRange(
    rawBudget,
    1,
    "999.999",
    "Monto"
  );

  if (budgetResult.errors.length > 0) {
    const errorMessage = budgetResult.errors;
    return errorMessage;
  }

  return false;
};

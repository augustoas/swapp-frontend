export function validateEmail(
  email: string,
  key?: string
): {
  valid: boolean;
  errors: string[];
} {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors: string[] = [];

  if (!email.match(emailPattern)) {
    errors.push(`${key}: Enter a valid email address.`);
  }
  return { valid: errors.length === 0, errors };
}

export function validateOnlyText(
  input: string,
  key?: string
): {
  valid: boolean;
  errors: string[];
} {
  const textPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  const errors: string[] = [];

  if (!input.match(textPattern)) {
    errors.push(`${key}: Only text allowed.`);
  }
  return { valid: errors.length === 0, errors };
}

export function validatePassword(
  password: string,
  key?: string
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push(`${key}: Password must be at least 8 characters long.`);
  }

  // if (!/[A-Z]/.test(password)) {
  //   errors.push("Password must contain at least one uppercase letter.");
  // }

  // if (!/[0-9]/.test(password)) {
  //   errors.push("Password must contain at least one number.");
  // }

  return {
    valid: errors.length === 0,
    errors: errors,
  };
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
  key?: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password !== confirmPassword) {
    errors.push(`${key}: Passwords do not match.`);
  }

  return { valid: errors.length === 0, errors };
}

export function validateMinimumCaracters(
  input: string,
  number: number,
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (input.length < number) {
    errors.push(`Debe tener al menos ${number} caracteres.`);
  }

  return {
    valid: errors.length === 0,
    errors: errors,
  };
}

export function validateNumberBetweenRange(
  input: number,
  min: number | string,
  max: number | string,
  key?: string
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (
    input < Number(String(min).replace(/\D/g, "")) ||
    input > Number(String(max).replace(/\D/g, ""))
  ) {
    errors.push(`${key}: Debe asignar un valor entre ${min} y ${max}.`);
  }

  return {
    valid: errors.length === 0,
    errors: errors,
  };
}

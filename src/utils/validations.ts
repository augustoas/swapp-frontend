export function validateEmail(email: string): {
  valid: boolean;
  errors: string[];
} {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors: string[] = [];

  if (!email.match(emailPattern)) {
    errors.push("Please enter a valid email address.");
  }
  return { valid: errors.length === 0, errors };
}

export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
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
  confirmPassword: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  return { valid: errors.length === 0, errors };
}

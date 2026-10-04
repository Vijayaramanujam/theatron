export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^[+]?[\d\s-]{10,15}$/.test(phone.replace(/\s/g, ''));
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export interface FormErrors {
  [key: string]: string;
}

export const validateCommonFields = (data: Record<string, string>): FormErrors => {
  const errors: FormErrors = {};
  if (!validateRequired(data.name || '')) errors.name = 'Please enter your full name.';
  if (!validateEmail(data.email || '')) errors.email = 'Please enter a valid email address.';
  if (!validatePhone(data.phone || '')) errors.phone = 'Please enter a valid phone number.';
  if (!validateRequired(data.college || '')) errors.college = 'Please enter your college name.';
  if (!validateRequired(data.department || '')) errors.department = 'Please enter your department.';
  if (!validateRequired(data.year || '')) errors.year = 'Please select your year of study.';
  return errors;
};

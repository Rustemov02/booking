export type ErrorState = { [key: string]: string };

export const getError = (errors: ErrorState, field: string) => {
  if (!field) return null;
  return errors[field] || null;
};

export const clearError = (errors: ErrorState, field: string): ErrorState => {
  const updated = { ...errors };
  delete updated[field];
  return updated;
};

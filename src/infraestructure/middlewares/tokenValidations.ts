const invalidTokens: Set<string> = new Set();

export const addToInvalidTokens = (token: string) => {
  invalidTokens.add(token);
};

export const removeFromInvalidTokens = (token: string) => {
  invalidTokens.delete(token);
};

export const isTokenInvalid = (token: string) => {
  return invalidTokens.has(token);
};

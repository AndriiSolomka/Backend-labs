export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  defaultCurrencyId?: string | null;
};

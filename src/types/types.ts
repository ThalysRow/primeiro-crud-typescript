export type Car = {
  id: number;
  brand: string;
  model: string;
  yearcar: number;
  collor: string;
  price: number;
  user_id: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type SchemaNewUser = {
  validateAsync: any;
  name: string;
  email: string;
  password: string;
};

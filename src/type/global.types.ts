import 'express';

declare module 'express' {
  export interface Response {
    success(data?: { message?: string; data?: unknown }): void;
    error(data?: { message?: string; data?: unknown }): void;
    errorCreating(data?: { message?: string; data?: unknown }): void;
  }
  export interface Request {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}

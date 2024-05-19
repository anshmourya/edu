import 'express';

declare module 'express' {
  export interface Response {
    success(data?: { message?: string; data?: unknown }): void;
    error(data?: { message?: string; data?: unknown }): void;
  }
}

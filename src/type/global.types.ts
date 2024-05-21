import 'express';

declare module 'express' {
  export interface Response {
    success(data?: { message?: string; data?: unknown }): void;
    error(data?: { message?: string; data?: unknown }): void;
    errorCreating(data?: { message?: string; data?: unknown }): void;
    errorUpdating(data?: { message?: string; data?: unknown }): void;
    errorDeleting(data?: { message?: string; data?: unknown }): void;
    unathorized(data?: { message?: string; data?: unknown }): void;
    notFound(data?: { message?: string; data?: unknown }): void;
    conflict(data?: { message?: string; data?: unknown }): void;
    created(data?: { message?: string; data?: unknown }): void;
    updated(data?: { message?: string; data?: unknown }): void;
    deleted(data?: { message?: string; data?: unknown }): void;
  }
  export interface Request {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}

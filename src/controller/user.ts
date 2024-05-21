import { Request, Response } from 'express';

import appwrite from 'service/appwrite';

class User {
  async create(req: Request, res: Response) {
    try {
      const newUser = req.body;
      const createUserInAppwrite = await appwrite.createUser(
        newUser.email,
        newUser.password,
      );

      res.success({
        message: 'User created successfully',
        data: createUserInAppwrite,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.errorCreating(error);
    }
  }

  async createSesion(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const createSessionInAppwrite = await appwrite.loginUser(email, password);
      res.success({
        message: 'Session created successfully',
        data: createSessionInAppwrite,
      });
    } catch (error) {
      console.error('error while creating the session:', error);
      res.errorCreating(error);
    }
  }
  async getUser(req: Request, res: Response) {
    try {
      const user = await appwrite.getUser(req.params.id);
      res.success({
        message: 'User retrieved successfully',
        data: user,
      });
    } catch (error) {
      res.unathorized(error);
    }
  }
}

const user = new User();
export default user;

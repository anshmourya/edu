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
}

const user = new User();
export default user;

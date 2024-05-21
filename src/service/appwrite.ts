import client from '@config/appwrite';
import { Account, Users } from 'node-appwrite';
class Appwrite {
  private account: Account;
  private users: Users;
  constructor() {
    this.account = new Account(client);
    this.users = new Users(client);
  }
  async createUser(email: string, password: string) {
    try {
      const user = await this.account.create('unique()', email, password);
      console.log(user);
      return user;
    } catch (error) {
      console.log('error creating user in appwrite', error);
      throw error;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const user = await this.account.createEmailPasswordSession(
        email,
        password,
      );
      return user;
    } catch (error) {
      console.log('error while logging in', error);
      throw error;
    }
  }
  async getUser(id: string) {
    try {
      const user = await this.users.get(id);
      return user;
    } catch (error) {
      console.log('error while getting user', error);
      throw error;
    }
  }
}

const appwrite = new Appwrite();

export default appwrite;

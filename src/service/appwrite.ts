import client from '@config/appwrite';
import { Account } from 'node-appwrite';
class Appwrite {
  private account: Account;
  constructor() {
    this.account = new Account(client);
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
}

const appwrite = new Appwrite();

export default appwrite;

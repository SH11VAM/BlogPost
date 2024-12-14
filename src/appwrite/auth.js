import conf from "../config/config";
import { Client, Account, ID } from "appwrite";


export class AuthService {

    client = new Client();
    account;

    constructor() {
        
        
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
       
    }


    //-------------------- method-------------------------------------------------------------------------// 

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);


            if (userAccount) {

                //   call another function 
                return this.login({ email, password });

            } else {
                return userAccount;

            }
        } catch (error) {
            throw error;

        }

    }

    async login({ email, password }) {

        try {

            const session = await this.account.createEmailPasswordSession(email, password);
           
            return session;


        } catch (error) {
            throw error;
        }

    }

    async getcurrentUser() {
        try {
                return await this.account.get();
            
        } catch (error) {
            console.error("Error getting current user:", error);
        }
        return null;

    }

    async logout() {
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite :: Logout :: error ", error);

        }
    }

}

const authservice = new AuthService();

export default authservice;
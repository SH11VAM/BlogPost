import conf from "../config/config";
import { Client, Databases, ID, Storage, Query, Account } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, requiredImage, status, userId }) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, content, status, requiredImage, userId })

        } catch (error) {
            console.log("Appwrite createPost Error :: ", error);
        }

    }

    async updatePost(slug, { title, content, requiredImage, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, content, status, requiredImage })

        } catch (error) {
            console.log("Appwrite updatePost Error :: ", error);
        }

    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);

            return true;
        } catch (error) {
            console.log("Appwrite deletePost Error :: ", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)

        } catch (error) {
            console.log("Appwrite getPost Error :: ", error);
        }

    }

    async listPost(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)

        } catch (error) {
            console.log("Appwrite updatePost Error :: ", error);
        }


    }

    //  file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,

            )
            
        } catch (error) {
            console.log("Appwrite :: uploadfile error ::", error);
            return false;
            
            
        }

    }


    async deleteFile(fileID){

        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true;
        } catch (error) {
            console.log("Appwrite :: deleteFile ::", error);
            return false;
            
        }

    }

    async getFilePreview(fileID){

        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }

}


const service = new Service()
export default service;
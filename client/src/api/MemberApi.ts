import axios from "axios";
import { response } from "express";
import { request, requestAuth } from "./request";

export interface UserInfoItemTypes {
    avatarLink: string;
    username: string;
    userId: string;
  }

export const handleUserInfo = async (URL: String): Promise<UserInfoItemTypes> => {
        const response =  await requestAuth.get(`/api/${URL}`);
        if(response.status !== 200){
            throw new Error(response.data.message)
        }
        return response.data;
  }; 


export const handleUpdate = async (URL: String, avatarLink: String): Promise<UserInfoItemTypes> =>{
    const response = await requestAuth.patch(`/api/${URL}`,{
        avatarLink: avatarLink,
    });
    if(response.status !== 200){
        throw new Error(response.data.message)
    }
    return response.data.message;
}
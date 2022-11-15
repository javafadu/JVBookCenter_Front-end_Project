import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";


const IMAGE_SERVER = settings.imageServer;


/* 
  const response = await axios({
        method: "post",
        url: "http://192.168.1.171/books/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

*/


export const imageUpload = (formData) => {
    return axios.post(`${IMAGE_SERVER}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  export const deleteImage = (imageName) => {
    return axios.delete(`${IMAGE_SERVER}`, imageName, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };


  
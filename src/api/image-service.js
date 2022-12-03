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

export const imageUpload = (image) => {
  return axios.post(`${IMAGE_SERVER}/files/upload`, image, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
};

export const deleteImage = (id) => {
  return axios.delete(`${IMAGE_SERVER}/files/${id}`, {
    headers: authHeader(),
  });
};

export const getBookImage = (id) => {
  if (Array.isArray(id)) id = id[0];
  return axios.get(`${settings.apiURL}/files/display/${id}`, {
    responseType: "arraybuffer",
  });
};

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const mainInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const multipartInstance = axios.create({
  baseURL: API_URL
});

const apiCep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  headers: {
    "Content-type": "application/json"
  }
});

const httpCommom = {
  mainInstance,
  multipartInstance,
  apiCep,
};

export default httpCommom;
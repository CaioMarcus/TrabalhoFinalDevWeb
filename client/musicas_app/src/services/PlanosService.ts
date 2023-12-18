
import axios from "axios";
import { Plano } from "../objects/Planos";

const basePlanosUrl: string = "http://localhost:8080/api/planos"

export const fetchPlanos = async () => {
  try {
    const response = await axios.get<Plano[]>(basePlanosUrl);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching planos:', error);
    throw error;
  }
};
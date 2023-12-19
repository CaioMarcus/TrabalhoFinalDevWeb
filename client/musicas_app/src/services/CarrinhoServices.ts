import axios from "axios";
import { Carrinho } from "../hooks/useCarrinho";

const BASE_URL = "http://localhost:8080/api/carrinho";
const GET_CARRINHO_URL = BASE_URL;
const ADICIONA_NO_CARRINHO_URL = BASE_URL + "/adicionaProduto";
const SUBTRAI_DO_CARRINHO_URL = BASE_URL + "/subtraiProduto";
const REMOVE_DO_CARRINHO_URL = BASE_URL + "/removeProduto";

export const fetchCarrinho = async () => {
    try {

        const response = await axios.get<Carrinho>(GET_CARRINHO_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching carrinhos:', error);
        throw error;
    }
};

export const adicionaNoCarrinho = async (produtoId: number) => {
    const body = {
        produtoId: produtoId
    }
    try {
        const response = await axios.post<Carrinho>(ADICIONA_NO_CARRINHO_URL, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching carrinhos:', error);
        throw error;
    }
}

export const subtraiDoCarrinho = async (produtoId: number) => {
    const body = {
        produtoId: produtoId
    }
    try {
        const response = await axios.post<Carrinho>(SUBTRAI_DO_CARRINHO_URL, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching carrinhos:', error);
        throw error;
    }
}

export const removeDoCarrinho = async (produtoId: number) => {
    const body = {
        produtoId: produtoId
    }
    try {
        const response = await axios.post<Carrinho>(REMOVE_DO_CARRINHO_URL, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching carrinhos:', error);
        throw error;
    }
}
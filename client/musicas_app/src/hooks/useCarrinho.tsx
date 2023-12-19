import { create } from 'zustand';
import { ProdutoCarrinho } from '../objects/ProdutoCarrinho';
import { adicionaNoCarrinho, fetchCarrinho, removeDoCarrinho, subtraiDoCarrinho } from '../services/CarrinhoServices';

export type Carrinho = {
    produtos: ProdutoCarrinho[];
    total: number;
}

export type CarrinhoActions = {
    adicionaNoCarrinho: (idProduto: number) => void;
    subtraiDoCarrinho: (idProduto: number) => void;
    removeDoCarrinho: (idProduto: number) => void;
    atualizaCarrinho: () => void;
}

export const useCarrinho = create<Carrinho & CarrinhoActions>((set) => ({
    produtos: [],
    total: 0,
    adicionaNoCarrinho: async (produtoId: number) => {
        await adicionaItem(produtoId, set);
    },
    removeDoCarrinho: async (produtoId: number) => {
        await removeItem(produtoId, set);
    },
    subtraiDoCarrinho: async (produtoId: number) => {
        await subtraiItem(produtoId, set);
    },
    atualizaCarrinho: async () => {
        await atualizaCarrinho(set);
    },
}));


const adicionaItem = async (produtoId: number, set: (state: Carrinho) => void) => {
    try {
        const data = await adicionaNoCarrinho(produtoId);

        if (data) {
            set({
                produtos: data.produtos,
                total: data.total,
            });
        }
    } catch (error) {
        console.error('Erro retirando do carrinho:', error);
    }
};

const subtraiItem = async (produtoId: number, set: (state: Carrinho) => void) => {
    try {
        const data = await subtraiDoCarrinho(produtoId);

        if (data) {
            set({
                produtos: data.produtos,
                total: data.total,
            });
        }
    } catch (error) {
        console.error('Erro adicionando ao carrinho:', error);
    }
}

const removeItem = async (produtoId: number, set: (state: Carrinho) => void) => {
    try {
        const data = await removeDoCarrinho(produtoId);

        if (data) {
            set({
                produtos: data.produtos,
                total: data.total,
            });
        }
    } catch (error) {
        console.error('Erro adicionando ao carrinho:', error);
    }
}

const atualizaCarrinho = async (set: (state: Carrinho) => void) => {
    try {
        const data = await fetchCarrinho();
        if (data) {
            set({
                produtos: data.produtos,
                total: data.total,
            });
        }
    } catch (error) {
        console.error('Erro atualizando o carrinho:', error);
    }
}

export default useCarrinho;
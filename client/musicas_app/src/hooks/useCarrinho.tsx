import { create } from 'zustand';
import { ItemCarrinho } from '../objects/ItemCarrinho';

type Carrinho = {
    itens: ItemCarrinho[];
    valorTotal: number;
    adicionaNoCarrinho: (idItem: number) => void;
    removeDoCarrinho: (idItem: number) => void;
}    

export const useCarrinho = create<Carrinho>((set, get) => ({
    itens: [],
    valorTotal: 0,
    adicionaNoCarrinho: (itemId: number) => {
        adicionaItem(itemId).then((carrinhoNovo => {
            set({ itens: carrinhoNovo.itens, valorTotal: carrinhoNovo.valorTotal} )
        }));
    },
    removeDoCarrinho: (itemId: number) => {
        removeItem(itemId).then((carrinhoNovo => {
            set({ itens: carrinhoNovo.itens, valorTotal: carrinhoNovo.valorTotal} )
        }));
    },
}));


const adicionaItem = async (itemId: number) => {
    return {
        itens: [],
        valorTotal: 0
    }
}

const removeItem = async (itemId: number) => {
    return {
        itens: [],
        valorTotal: 0
    }
}


export default useCarrinho;
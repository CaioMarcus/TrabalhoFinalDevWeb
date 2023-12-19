import { Produto } from "./Produto";

export class ProdutoCarrinho{
    id: number;
    valor: number;
    produto: Produto
    quantidade: number;

    constructor(id: number, produto: Produto, valor: number, quantidade: number){
        this.id = id;
        this.valor = valor;
        this.produto = produto;
        this.quantidade = quantidade;
    }
}
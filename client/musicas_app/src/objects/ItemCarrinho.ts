export class ItemCarrinho{
    id: number;
    nome: string;
    valor: number;
    quantidade: number;

    constructor(id: number, nome: string, valor: number, quantidade: number){
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.quantidade = quantidade;
    }
}
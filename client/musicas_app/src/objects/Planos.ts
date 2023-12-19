export class Plano {
    id: number;
    produto: string;
    nome: string
    descricao: string;
    preco: number;
  
    constructor(id: number, produto:string, nome:string, descricao: string, preco: number) {
      this.id = id;
      this.produto = produto;
      this.nome = nome;
      this.descricao = descricao;
      this.preco = preco;
    }
  }
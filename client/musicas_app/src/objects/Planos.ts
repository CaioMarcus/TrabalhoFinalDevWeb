export class Plano {
    id: number;
    titulo: string
    descricao: string;
    preco: number
  
    constructor(id: number, titulo:string, descricao: string, preco: number) {
      this.id = id;
      this.titulo = titulo;
      this.descricao = descricao;
      this.preco = preco;
    }
  }
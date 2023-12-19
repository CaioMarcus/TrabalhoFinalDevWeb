class Musica {
    public id: number;
    public produto: string;
    public nome: string;
    public preco: number;
    public album: string;
    public artista: string;
    public duracao: string;
    public capa: Uint8Array;
  
    constructor(id:number, produto: string, nome: string, preco: number, album: string, artista: string, duracao: string, capa: Uint8Array) {
      this.id = id;
      this.produto = produto;
      this.nome = nome;
      this.preco = preco;
      this.album = album;
      this.artista = artista;
      this.duracao = duracao;
      this.capa = capa;
    }
  }
  
  export default Musica;
  
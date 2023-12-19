interface ResultadoPaginado<T> {
  quantidadeItens: number;
  quantidadePaginas: number;
  paginaAtual: number;
  itens: T[];
}
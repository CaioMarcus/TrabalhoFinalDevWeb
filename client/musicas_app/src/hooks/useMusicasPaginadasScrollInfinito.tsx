import { useInfiniteQuery } from "@tanstack/react-query";
import Musica from "../objects/Musica";
import { fetchMusicasComPaginacao, fetchMusicasPorNomeComPaginacao } from "../services/MusicaService";

interface PaginasMusicas {
    tamanho: number,
}



const useMusicasPaginadasScrollInfinito = (query: PaginasMusicas) => {
    
    return useInfiniteQuery<ResultadoPaginado<Musica>>({
        queryKey: ["musicasScrollInfinito", "paginacaoScrollInfinito", query],
        queryFn: ({ pageParam = 0 }) =>
        fetchMusicasComPaginacao({
                params: {
                    pagina: pageParam,
                    tamanho: query.tamanho,
                },
            }),
        staleTime: 10_000,
        keepPreviousData: true,
        getNextPageParam: (ultimaPagina) => {
            return ultimaPagina.paginaAtual < ultimaPagina.quantidadePaginas - 1 ?
                ultimaPagina.paginaAtual + 1 : undefined;
        }
    })

}
export default useMusicasPaginadasScrollInfinito;
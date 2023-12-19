import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchMusicasComPaginacao, fetchMusicasPorNomeComPaginacao } from "../services/MusicaService";
import Musica from "../objects/Musica";

interface PaginasMusicas {
    pagina: number,
    tamanho: number,
    nome: string
}

const useMusicasPaginadas = (query: PaginasMusicas) => {
    return useQuery({
        queryKey: ['musicas', 'paginacao', query],
        queryFn: () => fetchMusicasComPaginacao({
            params: {
                ...query
            }
        }),
        staleTime: 10_000,
        keepPreviousData: true,
    });
};

export default useMusicasPaginadas;
import { useQuery } from "@tanstack/react-query";
import { fetchMusicasComPaginacao, fetchMusicasPorNomeComPaginacao } from "../services/MusicaService";

interface PaginasMusicas {
    pagina: number,
    tamanho: number,
    nome: string
}

const useMusicasPaginadas = (query: PaginasMusicas) => {
    const fetchMusicas = query.nome
        ? () => fetchMusicasPorNomeComPaginacao(query.nome, query.pagina, query.tamanho)
        : () => fetchMusicasComPaginacao(query.pagina, query.tamanho);

    return useQuery({
        queryKey: ['musicas', 'paginacao', query],
        queryFn: fetchMusicas,
        staleTime: 10_000,
        keepPreviousData: true,
    });
};

export default useMusicasPaginadas;
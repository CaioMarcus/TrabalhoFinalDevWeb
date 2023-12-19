import InfiniteScroll from "react-infinite-scroll-component";
import useMusicasPaginadasScrollInfinito from "../hooks/useMusicasPaginadasScrollInfinito"
import Musica from "../objects/Musica";
import { deletaMusica } from "../services/MusicaService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const GerenciarMusicasPage = () => {

    const navigate = useNavigate();
    const tamanho = 18;
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } =
        useMusicasPaginadasScrollInfinito({ tamanho });

    const getQtdProdutos = data?.pages.reduce((total, page) => total + page.itens.length, 0) || 0;

    useEffect(() => {
        refetch();
    }, [])

    const editarMusica = (idMusica: number) => {
        navigate(`/editarMusica/${idMusica}`)
    }

    const removerMusica = (idMusica: number) => {
        deletaMusica(idMusica).then(() => {
            refetch();
        })
    }

    if (isLoading) return <h6>Carregando...</h6>;
    if (error) throw error;

    return (
        <InfiniteScroll
            dataLength={getQtdProdutos}
            hasMore={!!hasNextPage}
            next={fetchNextPage}
            loader={<h6>Carregando...</h6>}
            style={{ overflow: "visible" }}>
            <div className="d-flex justify-content-between align-items-start">
                <h2 className="text-center mb-4">Gerenciar Musicas</h2>
                <button className="btn btn-success" onClick={() => navigate('/adicionarMusica')}>
                    Adicionar Musica
                </button>
            </div>
            <div className="container mt-5 overflow-hidden justify-content-between align-items-baseline">
                <div className="row justify-content-center">
                    {data?.pages.map((pagina) =>
                        pagina.itens.map((musica: Musica, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <div className="card d-flex flex-column h-100 ">
                                    <div className="card-body flex-grow-1 d-flex flex-column justify-content-between" style={{ minHeight: '250px', maxHeight: "500px" }}>
                                        <h5 className="card-title" >{musica.nome}</h5>
                                        <p className="card-text">{musica.album}</p>
                                        <b className="card-text">{musica.artista}</b>
                                        <h6 className="card-subtitle mb-2 text-muted">R${musica.preco.toLocaleString("pt-BR", 
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            useGrouping: true,
                                        })}
                                        </h6>
                                        <div className="d-flex">
                                            <button className="btn btn-outline-danger w-50" onClick={() => removerMusica(musica.id!)}>
                                                Remover
                                            </button>
                                            <button className="btn btn-outline-warning w-50" onClick={() => editarMusica(musica.id!)}>
                                                Editar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )))}
                </div>
            </div>

        </InfiniteScroll>
    )
}
export default GerenciarMusicasPage;
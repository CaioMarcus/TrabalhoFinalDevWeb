import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMusicasPaginadas from "../hooks/useMusicasPaginadas";
import useMusicasStore from "../hooks/useMusicasStore"
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons/faArrowLeftLong";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons/faArrowRightLong";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import useCarrinho from "../hooks/useCarrinho";


const TabelaDeMusicas = () => {
    const carrinho = useCarrinho();
    const { pagina, tamanho, nome, setNome, setPagina } = useMusicasStore();
    const { data: musicasPaginadas, isLoading, error } = useMusicasPaginadas({ pagina, tamanho, nome });

    if (isLoading) return <h6>Carregando...</h6>;
    if (error) throw error;


    const musicas = musicasPaginadas!.itens;
    const paginaAtual = musicasPaginadas!.paginaAtual;
    const totalDePaginas = musicasPaginadas!.quantidadePaginas;
    console.log(musicasPaginadas)
    return (
        <div className="container mt-5">
            <>
                <div className='container-fluid'>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr className='d-flex'>
                                <th className='col-2'>Artista</th>
                                <th className='col-4'>Nome</th>
                                <th className='col-4'>Album</th>
                                <th className='col-1 '>Preço</th>
                                <th className='col-1 '></th>
                            </tr>
                        </thead>
                        <tbody>
                            {musicas.map((musica) => (
                                <tr key={musica.id} className='d-flex'>
                                    <td className='col-2'>{musica.artista}</td>
                                    <td className='col-4'>{musica.nome}</td>
                                    <td className='col-4'>{musica.album}</td>
                                    <td className='col-1'>R${musica.preco}</td>
                                    <td className='col-1 text-center'>
                                        <button className="btn btn-success" onClick={() => carrinho.adicionaNoCarrinho(musica.id)}>
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
            <div className="justify-content-center text-center">
                <button className="btn btn-lg" onClick={() => setPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </button>
                <span>Pagina {paginaAtual}</span>
                <button className="btn btn-lg" onClick={() => setPagina(paginaAtual + 1)} disabled={paginaAtual >= (totalDePaginas - 1)}>
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </button>
            </div>
        </div>
    );
};

export default TabelaDeMusicas;
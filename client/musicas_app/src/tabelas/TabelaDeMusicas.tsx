import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMusicasPaginadas from "../hooks/useMusicasPaginadas";
import useMusicasStore from "../hooks/useMusicasStore"
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons/faArrowLeftLong";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons/faArrowRightLong";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import useCarrinho from "../hooks/useCarrinho";
import { useState } from "react";
import { Produto } from "../objects/Produto";
import Musica from "../objects/Musica";


const TabelaDeMusicas = () => {
    const carrinho = useCarrinho();
    const { pagina, tamanho, nome, setPagina } = useMusicasStore();
    const { data: musicasPaginadas, isLoading, error } = useMusicasPaginadas({ pagina, tamanho, nome });
    const [mostrarModal, setmostrarModal] = useState(false);
    const [musicaAdicionada, setMusicaAdicionada] = useState<Musica>()

    if (isLoading) return <h6>Carregando...</h6>;
    if (error) throw error;

    const musicas = musicasPaginadas!.itens;
    const paginaAtual = musicasPaginadas!.paginaAtual;
    const totalDePaginas = musicasPaginadas!.quantidadePaginas;



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
                                        <button className="btn btn-success" onClick={() => {
                                            carrinho.adicionaNoCarrinho(musica.id!)
                                            setmostrarModal(true)
                                            setMusicaAdicionada(musica);
                                        }}>
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
                <button className="btn btn-lg" onClick={() => setPagina(paginaAtual - 1)} disabled={paginaAtual === 0}>
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </button>
                <span>Pagina {paginaAtual + 1}</span>
                <button className="btn btn-lg" onClick={() => setPagina(paginaAtual + 1)} disabled={paginaAtual >= (totalDePaginas - 1)}>
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </button>
            </div>

            {/* Modal */}
            {mostrarModal && (
                <div className="modal" role="dialog" style={{ display: "block"}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{backgroundColor: "#5B4B8A"}}>
                            <div className="modal-header">
                                <h5 className="modal-title">Musica Adicionada Ao Carrinho</h5>
                                <button type="button" className="btn close" data-dismiss="modal"  onClick={() => setmostrarModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>A musica "{musicaAdicionada?.nome}" foi adicionada ao carrinho!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setmostrarModal(false)}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabelaDeMusicas;
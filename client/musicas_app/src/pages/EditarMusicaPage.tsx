import { useNavigate, useParams } from "react-router-dom"
import EditarMusicaForm, { MusicaFormData } from "../forms/MusicaForm"
import { useEffect, useState } from "react";
import { atualizaMusica, fetchMusicaPorId } from "../services/MusicaService";
import Musica from "../objects/Musica";

const EditarMusicaPage = () => {
    const { musicaId } = useParams();
    const [musicaAtual, setMusicaAtual] = useState<Musica>();
    const navigate = useNavigate();

    if (musicaId === null || musicaId === undefined) return;

    useEffect(() => {
        fetchMusicaPorId(musicaId).then((musica) => {
            if (musica === null) return;
            setMusicaAtual(musica);
        });
    }, [])

    const onSubmit = (data: MusicaFormData) => {
        console.log(data)
        const musica: Musica = {
            id: musicaAtual!.id,
            produto: musicaAtual!.produto,
            capa: musicaAtual!.capa,
            ...data,
        }
        atualizaMusica(musica);
    }

    if (musicaAtual === undefined) return <h6>Carregando...</h6>
    console.log(musicaAtual)

    return (
        <>
            <h2 className="text-center mb-4">Editar Musica</h2>
            <div className="d-flex justify-content-center">
                <EditarMusicaForm musicaId={musicaId!} onSubmit={onSubmit} musicaEditar={musicaAtual!}></EditarMusicaForm>
            </div>
        </>
    )
}
export default EditarMusicaPage
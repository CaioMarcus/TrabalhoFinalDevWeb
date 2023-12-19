import EditarMusicaForm, { MusicaFormData } from "../forms/MusicaForm"
import Musica from "../objects/Musica"
import { adicionaMusica } from "../services/MusicaService"

const AdicoinarMusicaPage = () => {

    const onSubmit = (data: MusicaFormData) => {
        console.log(data)
        const musica: Musica = {
            id: null,
            produto: null,
            capa: null,
            ...data,
        }
        adicionaMusica(musica);
    }

    return (
        <>
            <h2 className="text-center mb-4">Adicionar Musica</h2>
            <div className="d-flex justify-content-center">
                <EditarMusicaForm musicaId={null} onSubmit={onSubmit} musicaEditar={null}></EditarMusicaForm>
            </div>
        </>
    )
}
export default AdicoinarMusicaPage;
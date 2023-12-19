import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Musica from '../objects/Musica';


const schema = z.object({
  nome: z.string().min(3, 'O nome da música deve ter pelo menos 3 caracteres'),
  preco: z.number({ invalid_type_error: "O preço deve ser informado." }),
  album: z.string().min(3, 'O nome do álbum deve ter pelo menos 3 caracteres'),
  artista: z.string().min(3, 'O nome do artista deve ter pelo menos 3 caracteres'),
  duracao: z.string().min(1, 'A duração da música deve ser informada'),
});
export type MusicaFormData = z.infer<typeof schema>;

interface MusicFormProps {
  musicaId: string | null;
  onSubmit: (data: MusicaFormData) => void,
  musicaEditar: Musica | null,
}

const EditarMusicaForm: React.FC<MusicFormProps> = (props: MusicFormProps) => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<MusicaFormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/gerenciarMusicas');
  };

  const onSubmit = (data: MusicaFormData) => {
    props.onSubmit(data)
    navigate("/gerenciarMusicas")
  }

  useEffect(() => {
    if (props.musicaEditar === null) return;
    console.log(props.musicaEditar)
    setValue('nome', props.musicaEditar.nome)
    setValue('artista', props.musicaEditar.artista)
    setValue('album', props.musicaEditar.album)
    setValue('preco', props.musicaEditar.preco)
    setValue('duracao', props.musicaEditar.duracao)
  }, [])



  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '40vw', minHeight: '60px' }}>
      <div className="form-group pb-4">
        <label htmlFor="nome">Nome da Música</label>
        <input type="text" id="nome" {...register('nome')} className="form-control" />
        <p className="text-danger" style={{ position: 'absolute' }}>{errors.nome?.message}</p>
      </div>
      <div className="form-group pb-4">
        <label htmlFor="artista">Artista</label>
        <input type="text" id="artista" {...register('artista')} className="form-control" />
        <p className="text-danger" style={{ position: 'absolute' }}>{errors.artista?.message}</p>
      </div>
      <div className="form-group pb-4">
        <label htmlFor="album">Álbum</label>
        <input type="text" id="album" {...register('album')} className="form-control" />
        <p className="text-danger" style={{ position: 'absolute' }}>{errors.album?.message}</p>
      </div>
      <div className="form-group pb-4">
        <label htmlFor="preco">Preço</label>
        <input type="number" step="0.01" min="0" id="preco" {...register('preco', {valueAsNumber: true})} className="form-control" />
        <p className="text-danger" style={{ position: 'absolute' }}>{errors.preco?.message}</p>
      </div>
      <div className="form-group pb-5">
        <label htmlFor="duracao">Duração</label>
        <input type="text" id="duracao" {...register('duracao')} className="form-control" />
        <p className="text-danger" style={{ position: 'absolute' }}>{errors.duracao?.message}</p>
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-success btn-lg">
          Salvar
        </button>
        <button type="button" className="btn btn-secondary btn-lg" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditarMusicaForm;

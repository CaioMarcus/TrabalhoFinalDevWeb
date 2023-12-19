import axios from 'axios';
import Musica from '../objects/Musica';

const BASE_URL = 'http://localhost:8080/api/musicas';
const GET_MUSICAS_URL = BASE_URL;
const GET_MUSICAS_COM_FILTRO_URL = BASE_URL + '/filtro';
const GET_MUSICAS_COM_PAGINACAO = BASE_URL + '/getComPaginacao';
const GET_MUSICAS_COM_NOME_COM_PAGINACAO = BASE_URL + '/getPorNomeComPaginacao';
const ADICIONA_MUSICA_URL = BASE_URL + '/adicionaMusica';
const ATUALIZA_MUSICA_URL = BASE_URL + '/atualizaMusica';
const DELETA_MUSICA_URL = BASE_URL + '/deletaMusica';

export const fetchMusicas = async () => {
  try {
    const response = await axios.get<Musica[]>(GET_MUSICAS_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching musicas:', error);
    throw error;
  }
};

export const fetchMusicasComFiltro = async (filtro: string) => {
  try {
    const response = await axios.get<Musica[]>(GET_MUSICAS_COM_FILTRO_URL, {
      params: { filtro },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching musicas with filter:', error);
    throw error;
  }
};

export const fetchMusicasComPaginacao = async (pagina: number, tamanho: number) => {
    const body = {
        pagina: pagina,
        tamanho: tamanho
    }
    
    try {
      const response = await axios.get<ResultadoPaginado<Musica>>(GET_MUSICAS_COM_PAGINACAO, {params : {...body}});
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching musicas with filter:', error);
      throw error;
    }
  };

  export const fetchMusicasPorNomeComPaginacao = async (nome:string, pagina: number, tamanho: number) => {
    const body = {
        nome: nome,
        pagina: pagina,
        tamanho: tamanho
    }
    
    try {
      const response = await axios.get<ResultadoPaginado<Musica>>(GET_MUSICAS_COM_NOME_COM_PAGINACAO, {params : {...body}});
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching musicas with filter:', error);
      throw error;
    }
  };

export const adicionaMusica = async (musica: Musica) => {
  try {
    const response = await axios.post<Musica>(ADICIONA_MUSICA_URL, musica);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding musica:', error);
    throw error;
  }
};

export const atualizaMusica = async (musica: Musica) => {
  try {
    const response = await axios.put<Musica>(ATUALIZA_MUSICA_URL, musica);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating musica:', error);
    throw error;
  }
};

export const deletaMusica = async (musicaId: number) => {
  try {
    const response = await axios.delete<boolean>(`${DELETA_MUSICA_URL}/${musicaId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting musica:', error);
    throw error;
  }
};
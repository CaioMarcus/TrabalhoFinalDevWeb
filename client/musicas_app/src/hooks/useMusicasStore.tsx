import { create } from "zustand";


export interface MusicasStore{
    pagina: number,
    nome: string,
    tamanho: number

    setPagina: (pagina: number) => void;
    setNome: (nome: string) => void;
}

const useMusicasStore = create<MusicasStore>((set) => ({
    pagina: 0,
    nome: "",
    tamanho: 10,
    setPagina: (pagina: number) => set(() => ({pagina: pagina})),
    setNome: (nome: string) => set(() => ({nome: nome})),
}))
export default useMusicasStore
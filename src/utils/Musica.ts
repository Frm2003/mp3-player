export default class Musica {
    nome: string;
    album: string | undefined;
    artista: string;
    arquivo: string;
    tipo: 'mp3' | 'youtube';

    constructor(
        nome: string,
        album: string | undefined,
        artista: string,
        arquivo: string,
        tipo: 'mp3' | 'youtube'
    ) {
        this.nome = nome;
        this.album = album;
        this.artista = artista;
        this.arquivo = arquivo;
        this.tipo = tipo;
    }
}

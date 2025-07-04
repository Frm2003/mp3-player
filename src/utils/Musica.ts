export default class Musica {
    nome: string;
    album: string | undefined;
    artista: string;
    arquivo: string;
    tipo: 'mp3' | 'youtube';

    next: Musica | null;
    back: Musica | null;

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

        this.next = null;
        this.back = null;
    }
}

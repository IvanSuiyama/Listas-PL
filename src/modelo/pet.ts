export default class Pet {
    private nome: string;
    private tipo: string;
    private raca: string;
    private genero: string;

    constructor(nome: string, raca: string, genero: string, tipo: string) {
        this.nome = nome;
        this.raca = raca;
        this.genero = genero;
        this.tipo = tipo;
    }

    public get getNome(): string {
        return this.nome;
    }

    public get getRaca(): string {
        return this.raca;
    }

    public get getGenero(): string {
        return this.genero;
    }

    public get getTipo(): string {
        return this.tipo;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setRaca(raca: string): void {
        this.raca = raca;
    }

    public setGenero(genero: string): void {
        this.genero = genero;
    }

    public setTipo(tipo: string): void {
        this.tipo = tipo;
    }
}


export default class Servico {
    public nome: string;
    public descricao: string;
    public valor: number;

    constructor(nome: string, descricao: string, valor: number) {
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
    }

    public get getNome(): string {
        return this.nome;
    }

    public get getDescricao(): string {
        return this.descricao;
    }

    public get getValor(): number {
        return this.valor;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public setValor(valor: number): void {
        this.valor = valor;
    }
}
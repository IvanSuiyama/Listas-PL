import Empresa from "../../modelo/empresa";
import Servico from "../../modelo/servico";

export default class ListagemServicos {
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }

    public listar(): void {
        console.log(`\nLista de todos os serviços:`);
        this.empresa.getServicos.forEach(servico => {
            console.log(`Nome: ${servico.nome}`);
            console.log(`Descrição: ${servico.descricao}`);
            console.log(`Valor: R$${servico.valor}`);
            console.log(`--------------------------`);
        });
        console.log(`\n`);
    }
}

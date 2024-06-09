import Entrada from "../../io/entrada";
import Empresa from "../../modelo/empresa";
import Servico from "../../modelo/servico";


export default class CadastroServico {
    private empresa: Empresa;
    private entrada: Entrada;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro de serviço`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do serviço: `);
        let descricao = this.entrada.receberTexto(`Por favor informe a descrição do serviço: `);
        let valor = this.entrada.receberNumero(`Por favor informe o valor do serviço: `);

        let servico = new Servico(nome, descricao, valor);

        this.empresa.getServicos.push(servico);
        console.log(`\nCadastro de serviço concluído :)\n`);
    }
}

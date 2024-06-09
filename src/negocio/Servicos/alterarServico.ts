import Entrada from "../../io/entrada";
import Empresa from "../../modelo/empresa";
import Servico from "../../modelo/servico";

export default class AlterarServico {
    private empresa: Empresa;
    private entrada: Entrada;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
        this.entrada = new Entrada();
    }

    public alterarServicoPorNome(): void {
        console.log(`\nAlteração de Serviço`);
        let nome = this.entrada.receberTexto(`Por favor, informe o nome do serviço que deseja alterar: `);
        let servico = this.empresa.getServicos.find(servico => servico.nome === nome);

        if (servico) {
            let novoNome = this.entrada.receberTexto(`Por favor, informe o novo nome do serviço: `);
            let novaDescricao = this.entrada.receberTexto(`Por favor, informe a nova descrição do serviço: `);
            let novoValor = this.entrada.receberNumero(`Por favor, informe o novo valor do serviço: `);

            servico.nome = novoNome;
            servico.descricao = novaDescricao;
            servico.valor = novoValor;

            console.log(`\nServiço alterado com sucesso!\n`);
        } else {
            console.log(`\nServiço não encontrado!\n`);
        }
    }
}

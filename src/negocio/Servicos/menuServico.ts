import Entrada from "../../io/entrada";
import Empresa from "../../modelo/empresa";
import CadastroServico from "./cadastrarServicos";
import ListagemServicos from "./listarServico";
import AlterarServico from "./alterarServico";
import DeletarServico from "./deletarServico";
import CompraServico from "./compraServico";

export default class MenuServico {
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }

    public mostrarMenu(): void {
        let execucao = true;
        let entrada = new Entrada();

        while (execucao) {
            console.log(`\nMenu de Serviços:`);
            console.log(`1 - Cadastrar serviço`);
            console.log(`2 - Listar todos os serviços`);
            console.log(`3 - Alterar serviço`);
            console.log(`4 - Excluir serviço`);
            console.log(`5 - Registrar compra de serviço por cliente`);
            console.log(`0 - Voltar ao menu principal`);

            let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `);

            switch (opcao) {
                case 1:
                    let cadastroServico = new CadastroServico(this.empresa);
                    cadastroServico.cadastrar();
                    break;
                case 2:
                    let listagemServicos = new ListagemServicos(this.empresa);
                    listagemServicos.listar();
                    break;
                case 3:
                    let alterarServico = new AlterarServico(this.empresa);
                    alterarServico.alterarServicoPorNome();
                    break;
                case 4:
                    let deletarServico = new DeletarServico(this.empresa);
                    deletarServico.excluirServicoPorNome();
                    break;
                case 5:
                    let compraServico = new CompraServico(this.empresa);
                    compraServico.comprarServico();
                    break;
                case 0:
                    execucao = false;
                    console.log(`Voltando ao menu principal...`);
                    break;
                default:
                    console.log(`Operação não entendida :(`);
            }
        }
    }
}

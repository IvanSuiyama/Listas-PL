import Entrada from "../../io/entrada";
import Empresa from "../../modelo/empresa";
import CadastroCliente from "./cadastroCliente";
import ListagemClientes from "./listagemClientes";
import ExcluirCliente from "./excluirCliente";
import AlterarCliente from "./alterarCliente";


export default class MenuCliente{
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }

    public mostrarMenu(): void {
        let execucao = true;
        let entrada = new Entrada();

        while (execucao) {
            console.log(`\nMenu de Clientes:`);
            console.log(`1 - Cadastrar Cliente`);
            console.log(`2 - Listar todos os Clientes`);
            console.log(`3 - Alterar Cliente`);
            console.log(`4 - Excluir Cliente`);
            console.log(`0 - Voltar ao menu principal`);

            let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `);

            switch (opcao) {
                case 1:
                    let cadastroCliente = new CadastroCliente(this.empresa.getClientes);
                    cadastroCliente.cadastrar();
                    break;
                case 2:
                    let listagemClientes = new ListagemClientes(this.empresa.getClientes);
                    listagemClientes.listar();
                    break;
                case 3:
                    let alterarCliente = new AlterarCliente(this.empresa.getClientes);
                    alterarCliente.alterarClientePorCPF();
                    break;
                case 4:
                    let excluirCliente = new ExcluirCliente(this.empresa.getClientes);
                    excluirCliente.excluirClientePorCPF();
                    break;
                case 0:
                    execucao = false;
                    console.log(`Voltando ao menu principal...`);
                    break;
                default:
                    console.log(`Opção não reconhecida :(`);
            }
        }
    }
}
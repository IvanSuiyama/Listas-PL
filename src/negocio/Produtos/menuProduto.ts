import Entrada from "../../io/entrada";
import Empresa from "../../modelo/empresa";
import CadastroProduto from "./cadastrarProduto";
import ListagemProdutos from "./listarProduto";
import AlterarProduto from "./alterarProduto";
import DeletarProduto from "./deletarProduto";

export default class MenuProduto {
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }

    public mostrarMenu(): void {
        let execucao = true;
        let entrada = new Entrada();

        while (execucao) {
            console.log(`\nMenu de Produtos:`);
            console.log(`1 - Cadastrar produto`);
            console.log(`2 - Listar todos os produtos`);
            console.log(`3 - Alterar produto`);
            console.log(`4 - Excluir produto`);
            console.log(`0 - Voltar ao menu principal`);

            let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `);

            switch (opcao) {
                case 1:
                    let cadastroProduto = new CadastroProduto(this.empresa);
                    cadastroProduto.cadastrar();
                    break;
                case 2:
                    let listagemProdutos = new ListagemProdutos(this.empresa);
                    listagemProdutos.listar();
                    break;
                case 3:
                    let alterarProduto = new AlterarProduto(this.empresa);
                    alterarProduto.alterarProdutoPorNome();
                    break;
                case 4:
                    let deletarProduto = new DeletarProduto(this.empresa);
                    deletarProduto.excluirProdutoPorNome();
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

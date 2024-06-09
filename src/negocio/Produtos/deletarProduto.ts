import Entrada from "../../io/entrada";
import Empresa from "../../modelo/empresa";

export default class DeletarProduto {
    private empresa: Empresa;
    private entrada: Entrada;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
        this.entrada = new Entrada();
    }

    public excluirProdutoPorNome(): void {
        console.log(`\nExclusão de Produto`);
        let nomeProduto = this.entrada.receberTexto(`Por favor, informe o nome do produto a ser excluído: `);
        let indice = this.empresa.getProdutos.findIndex(produto => produto.getNome === nomeProduto);

        if (indice !== -1) {
            this.empresa.getProdutos.splice(indice, 1);
            console.log(`\nProduto excluído com sucesso!`);
        } else {
            console.log(`Produto não encontrado.`);
        }
    }
}

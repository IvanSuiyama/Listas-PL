import Produto from "../../modelo/produto";
import Empresa from "../../modelo/empresa";

export default class ListagemProdutos {
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }
    
    public listar(): void {
        console.log(`\nLista de Produtos:`);
        this.empresa.getProdutos.forEach((produto, index) => {
            console.log(`\nProduto ${index + 1}:`);
            console.log(`Nome: ${produto.getNome}`);
            console.log(`Descrição: ${produto.getDescricao}`);
            console.log(`Valor: R$ ${produto.getValor.toFixed(2)}`);
        });
        if (this.empresa.getProdutos.length === 0) {
            console.log("Nenhum produto cadastrado.");
        }
        console.log();
    }
}

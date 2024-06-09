import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Empresa from "../../modelo/empresa";

export default class AlterarProduto {
    private empresa: Empresa;
    private entrada: Entrada;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
        this.entrada = new Entrada();
    }

    public alterarProdutoPorNome(): void {
        console.log(`\nAlteração de Produto`);
        let nomeProduto = this.entrada.receberTexto(`Por favor, informe o nome do produto a ser alterado: `);
        let produto = this.empresa.getProdutos.find(produto => produto.getNome === nomeProduto);

        if (produto) {
            console.log(`Produto encontrado. Informe os novos dados.`);
            let novoNome = this.entrada.receberTexto(`Novo nome do produto: `);
            let novaDescricao = this.entrada.receberTexto(`Nova descrição do produto: `);
            let novoValor = this.entrada.receberNumero(`Novo valor do produto: `);

            produto.setNome(novoNome);
            produto.setDescricao(novaDescricao);
            produto.setValor(novoValor);

            console.log(`\nProduto alterado com sucesso!`);
        } else {
            console.log(`Produto não encontrado.`);
        }
    }
}

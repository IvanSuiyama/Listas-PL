import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Empresa from "../../modelo/empresa";
import Cadastro from "../clientes/cadastro";

export default class CadastroProduto extends Cadastro {
    private empresa: Empresa;
    private entrada: Entrada;

    constructor(empresa: Empresa) {
        super();
        this.empresa = empresa;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do produto`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do produto: `);
        let descricao = this.entrada.receberTexto(`Por favor informe a descrição do produto: `);
        let valor = this.entrada.receberNumero(`Por favor informe o valor do produto: `);
        
        let produto = new Produto(nome, descricao, valor);
        this.empresa.getProdutos.push(produto);
        
        console.log(`\nCadastro de produto concluído :)\n`);
    }
}

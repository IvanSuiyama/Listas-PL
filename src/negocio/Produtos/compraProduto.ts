import Entrada from "../../io/entrada";
import Empresa from "../../modelo/empresa";
import Produto from "../../modelo/produto";
import Cliente from "../../modelo/cliente";

export default class CompraProduto {
    private empresa: Empresa;
    private entrada: Entrada;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
        this.entrada = new Entrada();
    }

    public comprarProduto(): void {
        console.log(`\nRegistro de Compra de Produto`);
        let cpfCliente = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `);
        
        let cliente = this.empresa.getClientes.find(cliente => cliente.getCpf.getValor === cpfCliente);

        if (cliente) {
            console.log(`Cliente encontrado: ${cliente.nome}`);
            
            // Obtém informações do pet do cliente
            let racaPet = cliente.getPets[0].getRaca;
            let tipoPet = cliente.getPets[0].getTipo;
            
            let nomeProduto = this.entrada.receberTexto(`Por favor, informe o nome do produto que deseja comprar: `);
            let produto = this.empresa.getProdutos.find(produto => produto.nome === nomeProduto);

            if (produto) {
                // Adiciona o produto aos produtos consumidos pelo cliente
                cliente.getProdutosConsumidos.push(produto);
                console.log(`\nProduto ${produto.nome} comprado com sucesso para o cliente ${cliente.nome} com o pet da raça ${racaPet} e do tipo ${tipoPet}`);
            } else {
                console.log(`Produto não encontrado.`);
            }
        } else {
            console.log(`Cliente não encontrado.`);
        }
    }
}

import Empresa from "../../modelo/empresa";
import Cliente from "../../modelo/cliente";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import Entrada from "../../io/entrada";
export default class ListagemConsumoCliente {
    private empresa: Empresa;
    private entrada: Entrada;

    
    constructor(empresa: Empresa) {
        this.empresa = empresa;
        this.entrada = new Entrada();
    }

    public listarConsumoPorCPF(): void {
        const cpfDesejado = this.entrada.receberTexto("Digite o CPF do cliente que deseja listar o consumo: ");
        const cliente = this.empresa.getClientes.find(cliente => cliente.getCpf.getValor === cpfDesejado);

        if (cliente) {
            console.log(`\nLista de consumo para o cliente ${cliente.nome} (CPF: ${cpfDesejado}):`);

            // Lista os produtos consumidos pelo cliente
            console.log(`\nProdutos:`);
            cliente.getProdutosConsumidos.forEach((produto: Produto) => {
                console.log(`- ${produto.nome}`);
            });

            // Lista os serviços consumidos pelo cliente
            console.log(`\nServiços:`);
            cliente.getServicosConsumidos.forEach((servico: Servico) => {
                console.log(`- ${servico.nome}`);
            });
        } else {
            console.log(`Cliente com CPF ${cpfDesejado} não encontrado.`);
        }
    }
}

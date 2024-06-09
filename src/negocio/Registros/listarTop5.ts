import Empresa from "../../modelo/empresa";
import Cliente from "../../modelo/cliente";

export default class ListagemTopClientesPorValor {
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }

    public listarTopClientesPorValor(): void {
        // Criar um mapa para armazenar o valor total de consumo de cada cliente
        const valorPorCliente = new Map<Cliente, number>();

        // Iterar sobre todos os clientes
        this.empresa.getClientes.forEach((cliente: Cliente) => {
            let totalValorConsumido = 0;

            // Calcular o valor total de produtos consumidos pelo cliente
            cliente.getProdutosConsumidos.forEach((produto) => {
                totalValorConsumido += produto.valor;
            });

            // Calcular o valor total de serviços consumidos pelo cliente
            cliente.getServicosConsumidos.forEach((servico) => {
                totalValorConsumido += servico.valor;
            });

            // Armazenar o valor total de consumo do cliente no mapa
            valorPorCliente.set(cliente, totalValorConsumido);
        });

        // Ordenar os clientes com base no valor total de consumo em ordem decrescente
        const topClientesPorValor = [...valorPorCliente.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5); // Pegar os top 5 clientes

        // Exibir os top 5 clientes com base no valor total de consumo
        console.log(`\nTop 5 clientes com base no valor total de consumo:`);
        topClientesPorValor.forEach(([cliente, valorTotal]) => {
            console.log(`- Cliente: ${cliente.nome} (CPF: ${cliente.getCpf.getValor}) | Valor Total Consumido: ${valorTotal}`);
        });
    }
}

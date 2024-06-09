import Empresa from "../../modelo/empresa";
import Cliente from "../../modelo/cliente";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";

export default class ListagemTopClientes {
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }

    public listarTopClientes(): void {
        // Criar um mapa para armazenar a quantidade de produtos ou serviços consumidos por cada cliente
        const consumoClientes = new Map<Cliente, number>();

        // Iterar sobre todos os clientes
        this.empresa.getClientes.forEach((cliente: Cliente) => {
            // Calcular a quantidade total de produtos consumidos pelo cliente
            const quantidadeProdutos = cliente.getProdutosConsumidos.length;

            // Calcular a quantidade total de serviços consumidos pelo cliente
            const quantidadeServicos = cliente.getServicosConsumidos.length;

            // Calcular o total de consumo do cliente (soma das quantidades de produtos e serviços)
            const totalConsumo = quantidadeProdutos + quantidadeServicos;

            // Armazenar o total de consumo do cliente no mapa
            consumoClientes.set(cliente, totalConsumo);
        });

        // Ordenar os clientes com base na quantidade de consumo em ordem decrescente
        const topClientes = [...consumoClientes.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10); // Pegar os top 10 clientes

        // Exibir os top 10 clientes com base na quantidade de consumo
        console.log(`\nTop 10 clientes com base na quantidade de produtos ou serviços consumidos:`);
        topClientes.forEach(([cliente, consumo]: [Cliente, number], index: number) => {
            console.log(`${index + 1}. ${cliente.nome} - Consumo: ${consumo}`);
        });
    }
}

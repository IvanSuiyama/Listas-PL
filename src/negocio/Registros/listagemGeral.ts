import Empresa from "../../modelo/empresa";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";

export default class ListagemTopConsumo {
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }

    public listagemTopConsumo(): void {
        // Criar um mapa para armazenar a quantidade de cada produto ou serviço consumido
        const consumoPorItem = new Map<string, number>();

        // Iterar sobre todos os produtos consumidos pelos clientes
        this.empresa.getClientes.forEach((cliente) => {
            cliente.getProdutosConsumidos.forEach((produto: Produto) => {
                const nomeProduto = produto.nome;
                consumoPorItem.set(nomeProduto, (consumoPorItem.get(nomeProduto) || 0) + 1);
            });
        });

        // Iterar sobre todos os serviços consumidos pelos clientes
        this.empresa.getClientes.forEach((cliente) => {
            cliente.getServicosConsumidos.forEach((servico: Servico) => {
                const nomeServico = servico.nome;
                consumoPorItem.set(nomeServico, (consumoPorItem.get(nomeServico) || 0) + 1);
            });
        });

        // Ordenar os itens consumidos com base na quantidade em ordem decrescente
        const topConsumo = [...consumoPorItem.entries()]
            .sort((a, b) => b[1] - a[1]);

        // Exibir os itens mais consumidos por quantidade
        console.log(`\nLista dos serviços ou produtos mais consumidos por quantidade:`);
        topConsumo.forEach(([item, quantidade], index) => {
            console.log(`${index + 1}. ${item} - Quantidade: ${quantidade}`);
        });
    }
}

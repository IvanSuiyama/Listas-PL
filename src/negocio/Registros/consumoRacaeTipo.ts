import Empresa from "../../modelo/empresa";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import Cliente from "../../modelo/cliente";

export default class ListagemTopConsumoPorPet {
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }

    public listarTopConsumoPorPet(): void {
        // Criar um mapa para armazenar a quantidade de cada produto ou serviço consumido por tipo e raça de pets
        const consumoPorPet = new Map<string, Map<string, {item: string, quantidade: number}>>();

        // Iterar sobre todos os clientes
        this.empresa.getClientes.forEach((cliente: Cliente) => {
            // Iterar sobre os pets do cliente
            cliente.getPets.forEach((pet) => {
                const tipoPet = pet.getTipo;
                const racaPet = pet.getRaca;

                // Verificar se já existe uma entrada para o tipo de pet
                if (!consumoPorPet.has(tipoPet)) {
                    consumoPorPet.set(tipoPet, new Map<string, {item: string, quantidade: number}>());
                }

                // Verificar se já existe uma entrada para a raça de pet
                if (!consumoPorPet.get(tipoPet)!.has(racaPet)) {
                    consumoPorPet.get(tipoPet)!.set(racaPet, {item: "", quantidade: 0});
                }

                // Iterar sobre os produtos consumidos pelo cliente
                cliente.getProdutosConsumidos.forEach((produto: Produto) => {
                    const nomeProduto = produto.nome;
                    const quantidade = (consumoPorPet.get(tipoPet)!.get(racaPet)!.quantidade || 0) + 1;
                    consumoPorPet.get(tipoPet)!.set(racaPet, {item: nomeProduto, quantidade});
                });

                // Iterar sobre os serviços consumidos pelo cliente
                cliente.getServicosConsumidos.forEach((servico: Servico) => {
                    const nomeServico = servico.nome;
                    const quantidade = (consumoPorPet.get(tipoPet)!.get(racaPet)!.quantidade || 0) + 1;
                    consumoPorPet.get(tipoPet)!.set(racaPet, {item: nomeServico, quantidade});
                });
            });
        });

        // Exibir os serviços ou produtos mais consumidos por tipo e raça de pets
        console.log(`\nLista dos serviços ou produtos mais consumidos por tipo e raça de pets:`);
        consumoPorPet.forEach((consumoPorRaca, tipoPet) => {
            consumoPorRaca.forEach(({item, quantidade}, racaPet) => {
                console.log(`\nTipo: ${tipoPet} | Raça: ${racaPet} | Mais Consumido: ${item} (${quantidade})`);
            });
        });
    }
}

import Cliente from "../../modelo/cliente";

export default class ListarPets {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
    }

    public listarPets(): void {
        console.log(`\nListagem de Pets:`);
        this.clientes.forEach(cliente => {
            console.log(`Cliente: ${cliente.nome} (CPF: ${cliente.getCpf.getValor})`);
            cliente.getPets.forEach(pet => {
                console.log(`  - Nome: ${pet.getNome}, Tipo: ${pet.getTipo}, Raça: ${pet.getRaca}, Gênero: ${pet.getGenero}`);
            });
        });
    }
}


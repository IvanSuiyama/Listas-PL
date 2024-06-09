import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Pet from "../../modelo/pet";
import Cadastro from "../clientes/cadastro";

export default class CadastroPet extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do pet`);
        let cpfCliente = this.entrada.receberTexto(`Por favor informe o CPF do cliente: `);

        // Verificar se o cliente existe
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfCliente);

        if (cliente) {
            let nomePet = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `);
            let racaPet = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `);
            let genero = this.entrada.receberTexto(`Por favor informe o gênero do seu pet: `);
            let tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `);
            let pet = new Pet(nomePet, racaPet, genero, tipo);

            cliente.adicionarPet(pet);

            console.log(`\nCadastro de pet concluído :)\n`);
        } else {
            console.log(`\nCliente não encontrado. O pet não pode ser cadastrado.\n`);
        }
    }
}

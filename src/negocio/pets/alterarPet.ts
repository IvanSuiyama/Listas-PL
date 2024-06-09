import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Cadastro from "../clientes/cadastro";

export default class AlterarPet extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        // Método cadastrar não é necessário para a classe AlterarPet,
        // portanto, mantenha-o vazio.
    }

    public alterarPetPorCPF(): void {
        const cpfDesejado = this.entrada.receberTexto("Digite o CPF do cliente que possui o pet que deseja alterar: ");
        const clienteExistente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfDesejado);

        if (!clienteExistente) {
            console.log(`O cliente com CPF ${cpfDesejado} não foi encontrado.`);
            return;
        }

        if (clienteExistente.getPets.length === 0) {
            console.log(`O cliente com CPF ${cpfDesejado} não possui nenhum pet cadastrado.`);
            return;
        }

        console.log(`Cliente encontrado. Você está prestes a alterar os dados dos pets do cliente com CPF ${cpfDesejado}:`);

        clienteExistente.getPets.forEach((pet, index) => {
            console.log(`Alterando dados do pet ${index + 1}:`);
            const novoNomePet = this.entrada.receberTexto(`Novo nome do pet (atual: ${pet.getNome}): `);
            const novaRacaPet = this.entrada.receberTexto(`Nova raça do pet (atual: ${pet.getRaca}): `);
            const novoGeneroPet = this.entrada.receberTexto(`Novo gênero do pet (atual: ${pet.getGenero}): `);
            const novoTipoPet = this.entrada.receberTexto(`Novo tipo do pet (atual: ${pet.getTipo}): `);

            pet.setNome(novoNomePet);
            pet.setRaca(novaRacaPet);
            pet.setGenero(novoGeneroPet);
            pet.setTipo(novoTipoPet);

            console.log(`Pet ${index + 1} atualizado com sucesso.`);
        });
    }
}

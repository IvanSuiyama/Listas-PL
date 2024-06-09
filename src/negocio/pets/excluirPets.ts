import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Cadastro from "../clientes/cadastro";

export default class ExcluirPet extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        // Método cadastrar não é necessário para a classe ExcluirPet,
        // portanto, mantenha-o vazio.
    }

    public excluirPetPorCPF(): void {
        // Solicita o CPF do cliente que possui o pet a ser excluído
        const cpfDesejado = this.entrada.receberTexto("Digite o CPF do cliente que possui o pet que deseja excluir: ");
        const clienteExistente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfDesejado);

        // Verifica se o cliente foi encontrado
        if (!clienteExistente) {
            console.log(`O cliente com CPF ${cpfDesejado} não foi encontrado.`);
            return;
        }

        if (clienteExistente.getPets.length === 0) {
            console.log(`O cliente com CPF ${cpfDesejado} não possui nenhum pet cadastrado.`);
            return;
        }

        // Solicita o nome do pet a ser excluído
        const nomePetDesejado = this.entrada.receberTexto("Digite o nome do pet que deseja excluir: ");
        const indicePet = clienteExistente.getPets.findIndex(pet => pet.getNome === nomePetDesejado);

        // Verifica se o pet foi encontrado
        if (indicePet === -1) {
            console.log(`O pet com nome ${nomePetDesejado} não foi encontrado.`);
            return;
        }

        // Remove o pet da lista do cliente
        clienteExistente.getPets.splice(indicePet, 1);

        // Confirmação de exclusão
        console.log(`Pet com nome ${nomePetDesejado} foi excluído com sucesso do cliente com CPF ${cpfDesejado}.`);
    }
}

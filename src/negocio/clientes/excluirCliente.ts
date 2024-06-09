import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Cadastro from "./cadastro";

export default class ExcluirCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        // Método cadastrar não é necessário para a classe ExcluirCliente,
        // portanto, mantenha-o vazio.
    }

    public excluirClientePorCPF(): void {
        // Solicita o CPF do cliente a ser excluído
        const cpfDesejado = this.entrada.receberTexto("Digite o CPF do cliente que deseja excluir: ");
        
        // Encontra o índice do cliente com o CPF fornecido
        const indiceCliente = this.clientes.findIndex(cliente => cliente.getCpf.getValor === cpfDesejado);

        // Verifica se o cliente foi encontrado
        if (indiceCliente === -1) {
            console.log(`O cliente com CPF ${cpfDesejado} não foi encontrado.`);
            return;
        }

        // Remove o cliente da lista
        const clienteExcluido = this.clientes.splice(indiceCliente, 1)[0];

        // Confirmação de exclusão
        console.log(`Cliente com CPF ${cpfDesejado} e seus pets foram excluídos com sucesso.`);
    }
}

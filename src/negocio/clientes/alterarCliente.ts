import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Cadastro from "./cadastro";


export default class AlterarCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        // Método cadastrar não é necessário para a classe AlterarCliente,
        // portanto, mantenha-o vazio.
    }

    public alterarClientePorCPF(): void {
        const cpfDesejado = this.entrada.receberTexto("Digite o CPF do cliente que deseja alterar: ");
        const clienteExistente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfDesejado);

        if (!clienteExistente) {
            console.log(`O cliente com CPF ${cpfDesejado} não foi encontrado.`);
            return;
        }

        console.log(`Cliente encontrado. Você está prestes a alterar os dados do cliente com CPF ${cpfDesejado}:`);
        const novoNome = this.entrada.receberTexto(`Novo nome (atual: ${clienteExistente.nome}): `);
        const novoNomeSocial = this.entrada.receberTexto(`Novo nome social (atual: ${clienteExistente.nomeSocial}): `);
        const novoCpfValor = this.entrada.receberTexto(`Novo CPF (atual: ${clienteExistente.getCpf.getValor}): `);
        const novaDataEmissao = this.entrada.receberTexto(`Nova data de emissão do CPF (atual: ${clienteExistente.getCpf.getDataEmissao.toLocaleDateString()}): `);

        let partesData = novaDataEmissao.split('/');
        let ano = parseInt(partesData[2]);
        let mes = parseInt(partesData[1]) - 1; // Meses no objeto Date começam do 0
        let dia = parseInt(partesData[0]);
        let novaDataEmissaoDate = new Date(ano, mes, dia);

        // Atualiza as informações do cliente
        clienteExistente.nome = novoNome;
        clienteExistente.nomeSocial = novoNomeSocial;
        clienteExistente.getCpf.setValor = novoCpfValor;
        clienteExistente.getCpf.setDataEmissao = novaDataEmissaoDate;

        // Permitir alteração dos pets do cliente
        

        console.log(`Cliente com CPF ${cpfDesejado} atualizado com sucesso.`);
    }       
    
}

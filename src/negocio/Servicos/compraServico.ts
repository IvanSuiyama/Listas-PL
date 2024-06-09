import Entrada from "../../io/entrada";
import Empresa from "../../modelo/empresa";
import Servico from "../../modelo/servico";
import Cliente from "../../modelo/cliente";

export default class CompraServico {
    private empresa: Empresa;
    private entrada: Entrada;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
        this.entrada = new Entrada();
    }

    public comprarServico(): void {
        console.log(`\nRegistro de Compra de Serviço`);
        let cpfCliente = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `);
        
        let cliente = this.empresa.getClientes.find(cliente => cliente.getCpf.getValor === cpfCliente);

        if (cliente) {
            console.log(`Cliente encontrado: ${cliente.nome}`);
            
            // Obtém informações do pet do cliente
            let racaPet = cliente.getPets[0].getRaca;
            let tipoPet = cliente.getPets[0].getTipo;
            
            let nomeServico = this.entrada.receberTexto(`Por favor, informe o nome do serviço que deseja solicitar: `);
            let servico = this.empresa.getServicos.find(servico => servico.nome === nomeServico);

            if (servico) {
                cliente.getServicosConsumidos.push(servico);
                console.log(`\nServiço ${servico.nome} solicitado com sucesso para o cliente ${cliente.nome} com o pet da raça ${racaPet} e do tipo ${tipoPet}`);
            } else {
                console.log(`Serviço não encontrado.`);
            }
        } else {
            console.log(`Cliente não encontrado.`);
        }
    }
}

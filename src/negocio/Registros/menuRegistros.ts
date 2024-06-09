import Empresa from "../../modelo/empresa";
import Entrada from "../../io/entrada";
import ListagemTopClientesPorValor from "./listarTop5";
import ListagemTopConsumo from "./listagemGeral";
import ListagemTopConsumoPorPet from "./consumoRacaeTipo";
import ListagemConsumoCliente from "./registroConsumo";

export default class MenuRegistros {
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }
    
    public exibirMenu(): void {
        let execucao = true;
        while (execucao){
        console.log("\n### MENU DE REGISTROS ###");
        console.log("1. Top 5 clientes por valor total consumido");
        console.log("2. Lista de serviços ou produtos mais consumidos por quantidade");
        console.log("3. Lista de serviços ou produtos mais consumidos por tipo e raça de pets");
        console.log("4. Lista de consumo de serviços ou produtos por cliente");
        console.log("0. Voltar ao menu inicial");
        
        const entrada = new Entrada();
       

        // Ler a opção do usuário
        // Aqui você pode implementar a leitura da entrada do usuário
        // e atribuir o valor à variável 'opcao'
        
        // Chamando a função correspondente à opção escolhida
        let opcao: number = entrada.receberNumero("Por favor, escolha uma opção: ");
        switch (opcao) {
            case 1:
                let listagemTopClientesPorValor = new ListagemTopClientesPorValor(this.empresa);
                listagemTopClientesPorValor.listarTopClientesPorValor();
                break;
            case 2:
                let listagemTopConsumo = new ListagemTopConsumo(this.empresa);
                listagemTopConsumo.listagemTopConsumo();
                break;
            case 3:
                let listagemTopConsumoPorPet = new ListagemTopConsumoPorPet(this.empresa);
                listagemTopConsumoPorPet.listarTopConsumoPorPet();
                break;
            case 4:
                let listagemConsumoPorCliente = new ListagemConsumoCliente(this.empresa);
                listagemConsumoPorCliente.listarConsumoPorCPF();
                break;
            case 0:
                execucao = false;
                break;
            default:
                console.log("Opção inválida.");
    }
}
}
}
import Entrada from "../../io/entrada";
import Empresa from "../../modelo/empresa";
import CadastroPet from "./cadastroPet";
import ListarPets from "./listarPets";
import AlterarPet from "./alterarPet";
import ExcluirPet from "./excluirPets";

export default class MenuPet {
    private empresa: Empresa;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
    }

    public mostrarMenu(): void {
        let execucao = true;
        let entrada = new Entrada();

        while (execucao) {
            console.log(`\nMenu de Pets:`);
            console.log(`1 - Cadastrar pet`);
            console.log(`2 - Listar todos os pets`);
            console.log(`3 - Alterar pet`);
            console.log(`4 - Excluir pet`);
            console.log(`0 - Voltar ao menu principal`);

            let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `);

            switch (opcao) {
                case 1:
                    let cadastroPet = new CadastroPet(this.empresa.getClientes);
                    cadastroPet.cadastrar();
                    break;
                case 2:
                    let listarPets = new ListarPets(this.empresa.getClientes);
                    listarPets.listarPets();
                    break;
                case 3:
                    let alterarPet = new AlterarPet(this.empresa.getClientes);
                    alterarPet.alterarPetPorCPF();
                    break;
                case 4:
                    let excluirPet = new ExcluirPet(this.empresa.getClientes);
                    excluirPet.excluirPetPorCPF();
                    break;
                case 0:
                    execucao = false;
                    console.log(`Voltando ao menu principal...`);
                    break;
                default:
                    console.log(`Opção não reconhecida :(`);
            }
        }
    }
}

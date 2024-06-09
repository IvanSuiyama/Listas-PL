import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import CompraServico from "../negocio/Servicos/compraServico";
import MenuProduto from "../negocio/Produtos/menuProduto"; 
import MenuServico from "../negocio/Servicos/menuServico";
import CompraProduto from "../negocio/Produtos/compraProduto";
import MenuRegistros from "../negocio/Registros/menuRegistros";
import MenuPet from "../negocio/pets/menuPet";
import MenuCliente from "../negocio/clientes/menuClientes";
console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`);
let empresa = new Empresa();
let execucao = true;

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Menu de Clientes`);
    console.log(`2 - Menu de pets`); 
    console.log(`3 - Menu de produtos`);
    console.log(`4 - Menu de serviços`);
    console.log(`5 - Comprar Produto`);
    console.log(`6 - Solicitar Serviço`);
    console.log(`7 - Menu de Registros`);
    console.log(`0 - Sair`);

    let entrada = new Entrada();
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `);

    switch (opcao) {
        case 1:
            let menuClientes = new MenuCliente(empresa);
            menuClientes.mostrarMenu();
            break;
        case 2:
            let menuPet = new MenuPet(empresa); 
            menuPet.mostrarMenu();
            break;
        case 3:
            let menuProduto = new MenuProduto(empresa);
            menuProduto.mostrarMenu();
            break;
        case 4:
            let menuServico = new MenuServico(empresa);
            menuServico.mostrarMenu();
            break;
        case 5:
            let compraProduto = new CompraProduto(empresa);
            compraProduto.comprarProduto();
            break;
        case 6:
            let comprarServico = new CompraServico(empresa);
            comprarServico.comprarServico();
            break;
        case 7:
            let menuRegistro = new MenuRegistros(empresa)
            menuRegistro.exibirMenu();
            break;           
        case 0:
            execucao = false;
            console.log(`Até mais`);
            break;
        default:
            console.log(`Operação não entendida :(`);
    }
}

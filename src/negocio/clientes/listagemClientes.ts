import Cliente from "../../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>;
    
    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }
    
    public listar(): void {
        console.log(`\nLista de todos os clientes:`);
        
        this.clientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome}`);
            console.log(`Nome social: ${cliente.nomeSocial}`);
            console.log(`CPF: ${cliente.getCpf.getValor}`);
            
            // Verifica se o cliente tem pets
            if (cliente.getPets.length > 0) {
                console.log(`Pets:`);
                
                // Lista os pets do cliente
                cliente.getPets.forEach(pet => {
                    console.log(`   Nome: ${pet.getNome}`);
                    console.log(`   Raça: ${pet.getRaca}`);
                    console.log(`   Gênero: ${pet.getGenero}`);
                    console.log(`   Tipo: ${pet.getTipo}`);
                });
            } else {
                console.log(`O cliente não possui pets.`);
            }
            
            console.log(`--------------------------------------`);
        });
        
        console.log(`\n`);
    }
}

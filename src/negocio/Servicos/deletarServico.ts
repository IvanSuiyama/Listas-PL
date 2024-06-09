import Entrada from "../../io/entrada";
import Empresa from "../../modelo/empresa";

export default class DeletarServico {
    private empresa: Empresa;
    private entrada: Entrada;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
        this.entrada = new Entrada();
    }

    public excluirServicoPorNome(): void {
        console.log(`\nExclusão de Serviço`);
        let nome = this.entrada.receberTexto(`Por favor, informe o nome do serviço que deseja excluir: `);
        let indice = this.empresa.getServicos.findIndex(servico => servico.nome === nome);

        if (indice !== -1) {
            this.empresa.getServicos.splice(indice, 1);
            console.log(`\nServiço excluído com sucesso!\n`);
        } else {
            console.log(`\nServiço não encontrado!\n`);
        }
    }
}

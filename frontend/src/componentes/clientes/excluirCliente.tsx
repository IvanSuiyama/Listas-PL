import React, { Component } from "react";

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
};

type Pet = {
    nomePet: string;
    raca: string;
    genero: string;
    tipo: string;
    donoCpf: string;
};

type Props = {
    tema: string;
    excluirCliente: (cpf: string) => void;
    clientes: Cliente[];
    pets: Pet[];
    atualizarPets: (petsAtualizados: Pet[]) => void; // Adicionando a prop atualizarPets
};

type State = {
    cpf: string;
    cpfValido: boolean;
};

export default class ExcluirCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpf: "",
            cpfValido: false,
        };
    }

    handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ cpf: event.target.value });
    };

    validarCpf = () => {
        const { cpf } = this.state;
        const { clientes } = this.props;

        const cpfValido = clientes.some(cliente => cliente.cpf === cpf);
        this.setState({ cpfValido });
        if (!cpfValido) {
            alert("CPF não encontrado!");
            // Limpar os campos relacionados ao cliente
            this.setState({
                cpf: "",
            });
        }
    };

    handleExcluirCliente = () => {
        const { cpf } = this.state;
        const { excluirCliente, pets } = this.props;

        const cliente = this.props.clientes.find(cliente => cliente.cpf === cpf);
        if (cliente) {
            const confirmacao = window.confirm(`Tem certeza que deseja excluir o cliente "${cliente.nome}"? Todos os seus pets serão excluídos junto.`);
            if (confirmacao) {
                excluirCliente(cpf);
                // Remove os pets do cliente da lista de pets
                const petsAtualizados = pets.filter(pet => pet.donoCpf !== cpf);
                // Atualiza a lista de pets no estado do componente pai
                // Para manter a consistência dos dados
                this.props.atualizarPets(petsAtualizados);
                alert("Cliente excluído com sucesso!");
                // Limpa o estado após a exclusão
                this.setState({
                    cpf: "",
                    cpfValido: false,
                });
            }
        } else {
            alert("Cliente não encontrado!");
        }
    };

    render() {
        const { tema } = this.props;
        const { cpf, cpfValido } = this.state;

        return (
            <div className="container-fluid">
                <div className="input-group mb-3">
                    <label htmlFor="cpf">CPF do Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CPF"
                        aria-label="CPF"
                        aria-describedby="basic-addon1"
                        name="cpf"
                        value={cpf}
                        onChange={this.handleCpfChange}
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={this.validarCpf} style={{ background: tema }}>
                        Validar CPF
                    </button>
                </div>
                {cpfValido && (
                    <div className="input-group mb-3">
                        <p>Tem certeza que deseja excluir o cliente "{cpf}"? Todos os seus pets serão excluídos junto.</p>
                        <div className="mb-3"></div> 
                        <button className="btn btn-outline-danger" type="button" onClick={this.handleExcluirCliente} style={{ background: tema }}>
                            Excluir Cliente
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

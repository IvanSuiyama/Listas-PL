import { Component, ChangeEvent, FormEvent } from "react";

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
};

type Props = {
    tema: string;
    cliente: Cliente;
    salvarEdicao: (clienteEditado: Cliente) => void;
};

type State = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
};

export default class EditarCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { nome, nomeSocial, cpf, dataEmissao } = props.cliente;
        this.state = {
            nome,
            nomeSocial,
            cpf,
            dataEmissao
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { nome, nomeSocial, cpf, dataEmissao } = this.state;
        const clienteEditado: Cliente = {
            nome,
            nomeSocial,
            cpf,
            dataEmissao
        };
        this.props.salvarEdicao(clienteEditado);
    }

    render() {
        const { tema } = this.props;
        const { nome, nomeSocial, cpf, dataEmissao } = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            aria-label="Nome"
                            name="nome"
                            value={nome}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome social"
                            aria-label="Nome social"
                            name="nomeSocial"
                            value={nomeSocial}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="CPF"
                            aria-label="CPF"
                            name="cpf"
                            value={cpf}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Data de emissão"
                            aria-label="Data de emissão"
                            name="dataEmissao"
                            value={dataEmissao}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <button
                            className="btn btn-outline-secondary"
                            type="submit"
                            style={{ background: tema }}
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

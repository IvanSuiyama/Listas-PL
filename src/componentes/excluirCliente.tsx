import { Component, ChangeEvent, FormEvent } from "react";

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
};

type Props = {
    tema: string;
    clientes: Cliente[];
    removerCliente: (cpf: string) => void;
};

type State = {
    cpf: string;
    mensagemErro: string;
    mensagemSucesso: string;
};

export default class ExcluirCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpf: '',
            mensagemErro: '',
            mensagemSucesso: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        this.setState({ cpf: value });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { cpf } = this.state;
        const { clientes, removerCliente } = this.props;

        const clienteExiste = clientes.some(cliente => cliente.cpf === cpf);
        if (clienteExiste) {
            removerCliente(cpf);
            this.setState({ mensagemErro: '', mensagemSucesso: 'Cliente excluído com sucesso.', cpf: '' });
        } else {
            this.setState({ mensagemErro: 'Cliente não existe.', mensagemSucesso: '' });
        }
    }

    render() {
        const { tema } = this.props;
        const { cpf, mensagemErro, mensagemSucesso } = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
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
                    {mensagemErro && (
                        <div className="alert alert-danger" role="alert">
                            {mensagemErro}
                        </div>
                    )}
                    {mensagemSucesso && (
                        <div className="alert alert-success" role="alert">
                            {mensagemSucesso}
                        </div>
                    )}
                    <div className="input-group mb-3">
                        <button
                            className="btn btn-outline-secondary"
                            type="submit"
                            style={{ background: tema }}
                        >
                            Excluir
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

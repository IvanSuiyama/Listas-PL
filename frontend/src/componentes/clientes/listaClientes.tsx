import React, { Component } from 'react';
import axios from 'axios';

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string | undefined;
};

type Props = {
    clientes: Cliente[];
};

type State = {
    clientes: Cliente[];
    error: string | null;
};

export default class ListaCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clientes: [],
            error :null
        };
    }

    componentDidMount() {
        this.fetchClientes();
    }

    async fetchClientes() {
        try {
            const response = await axios.get('http://localhost:5000/listarClientes');
            const clientes = response.data.map((cliente: any) => ({
                nome: cliente.nome,
                nomeSocial: cliente.nomeSocial,
                cpf: cliente.cpf,
                dataEmissao: cliente.dt_emissao, // Mapeando dt_emissao para dataEmissao
            }));
            console.log('Dados recebidos:', clientes); // Verificar dados mapeados
            this.setState({ clientes, error: null });
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            this.setState({ error: 'Erro ao buscar clientes.' });
        }
    }

    formatDate(dateString: string | undefined) {
        if (!dateString) {
            console.error('Data inválida:', dateString);
            return 'Data inválida';
        }

        // Verifica se a data é uma string válida antes de formatar
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error('Data inválida:', dateString);
            return 'Data inválida';
        }

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-BR', options);
    }

    render() {
        const { clientes, error } = this.state;

        return (
            <div className="container-fluid">
                {error && <div className="alert alert-danger">{error}</div>}
                {clientes.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        Nenhum cliente cadastrado.
                    </div>
                ) : (
                    <div className="list-group">
                        {clientes.map((cliente, index) => (
                            <div key={index}>
                                <div className="list-group-item list-group-item-action">
                                    <h5>{cliente.nome}</h5>
                                    <p>Nome Social: {cliente.nomeSocial}</p>
                                    <p>CPF: {cliente.cpf}</p>
                                    {/* Verifica se dataEmissao existe antes de formatar */}
                                    <p>Data de Emissão: {cliente.dataEmissao ? this.formatDate(cliente.dataEmissao) : 'Data não disponível'}</p>
                                </div>
                                {index !== clientes.length - 1 && <hr style={{ borderColor: 'blue' }} />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

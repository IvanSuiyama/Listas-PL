import React, { Component } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';

type Props = {
    tema: string;
    excluirPet: (nomePet: string, cpf: string) => void;
    clientes: Array<{ cpf: string; nome: string }>;
    pets: Pet[];
};

type Pet = {
    nomePet: string;
    raca: string;
    genero: string;
    tipo: string;
    donoCpf: string;
};

type State = {
    cpf: string;
    pets: Pet[];
    petsLoaded: boolean;
    petSelecionado: Pet | null;
    nomeDono: string;
    mensagem: string;
    erro: boolean;
};

export default class ExcluirPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpf: '',
            pets: [],
            petsLoaded: false,
            petSelecionado: null,
            nomeDono: '',
            mensagem: '',
            erro: false,
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        } as Pick<State, keyof State>));
    };

    handleCpfVerify = async () => {
        const { cpf } = this.state;
        const cpfSemMascara = cpf.replace(/[^\d]/g, '');

        console.log(`Verificando CPF: ${cpfSemMascara}`); // Log de depuração

        try {
            const response = await axios.get(`http://localhost:5000/buscarPetPorCpf?cpf=${cpfSemMascara}`);

            console.log(`Resposta do servidor: `, response.data); // Log de depuração

            if (response.status === 200) {
                const data = response.data;

                if (Array.isArray(data)) {
                    if (data.length === 0) {
                        this.setState({
                            pets: [],
                            petsLoaded: true,
                            mensagem: 'Nenhum pet encontrado para este CPF.',
                        });
                    } else {
                        this.setState({
                            pets: data,
                            petsLoaded: true,
                            mensagem: '',
                        });
                    }
                } else if (data && typeof data === 'object') {
                    this.setState({
                        pets: [data],
                        petsLoaded: true,
                        mensagem: '',
                    });
                } else {
                    throw new Error('Resposta inesperada do servidor.');
                }
            } else if (response.status === 404) {
                this.setState({
                    pets: [],
                    petsLoaded: false,
                    mensagem: 'Cliente não encontrado.',
                });
            } else {
                throw new Error('Erro ao verificar CPF.');
            }
        } catch (error) {
            console.error('Erro ao verificar CPF', error);
            this.setState({
                pets: [],
                petsLoaded: false,
                mensagem: 'Erro ao verificar CPF.',
                erro: true,
            });
        }
    };

    handlePetSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { pets } = this.state;
        const petIndex = event.target.selectedIndex - 1;

        if (petIndex >= 0 && pets.length > 0) {
            const petSelecionado = pets[petIndex];
            this.setState({
                petSelecionado,
            });
        } else {
            this.setState({
                petSelecionado: null,
            });
        }
    };

    handleExcluirPet = async () => {
        const { petSelecionado, cpf } = this.state;
    
        if (!petSelecionado || !cpf) {
            alert("Por favor, selecione um pet e informe o CPF do dono.");
            return;
        }
    
        const confirmacao = window.confirm(`Tem certeza que deseja excluir o pet "${petSelecionado.nomePet}"?`);
    
        if (confirmacao) {
            try {
                await axios.post('http://localhost:5000/excluirPet', { cpf, nomePet: petSelecionado.nomePet });
                alert("Pet excluído com sucesso!");
                this.setState({
                    cpf: '',
                    pets: [],
                    petsLoaded: false,
                    petSelecionado: null,
                    mensagem: '',
                    erro: false,
                });
            } catch (error) {
                console.error("Erro ao excluir pet", error);
               
            }
        }
    };

    render() {
        const { tema } = this.props;
        const { cpf, pets, petsLoaded, petSelecionado, mensagem, erro } = this.state;

        console.log(`Renderizando componente. petsLoaded: ${petsLoaded}, pets: ${Array.isArray(pets) ? pets.length : 'undefined'}`); // Log de depuração

        return (
            <div className="container-fluid">
                <div className="input-group mb-3">
                    <label htmlFor="cpf">CPF do Cliente</label>
                    <InputMask
                        mask="999.999.999-99"
                        className="form-control"
                        placeholder="CPF"
                        aria-label="CPF"
                        aria-describedby="basic-addon1"
                        name="cpf"
                        value={cpf}
                        onChange={this.handleInputChange}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.handleCpfVerify}
                        style={{ background: tema }}
                    >
                        Verificar CPF
                    </button>
                </div>

                {petsLoaded && pets.length > 0 && (
                    <div className="input-group mb-3">
                        <label htmlFor="pet">Selecione um Pet</label>
                        <select className="form-control" name="pet" onChange={this.handlePetSelect}>
                            <option>Selecione...</option>
                            {pets.map((pet, index) => (
                                <option key={index} value={pet.nomePet}>{pet.nomePet}</option>
                            ))}
                        </select>
                    </div>
                )}

                {petSelecionado && (
                    <div className="input-group mb-3">
                        <p>Tem certeza que deseja excluir o pet "{petSelecionado.nomePet}"?</p>
                        <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={this.handleExcluirPet}
                            style={{ background: tema }}
                        >
                            Excluir Pet
                        </button>
                    </div>
                )}

                {petsLoaded && pets.length === 0 && <div className="alert alert-warning">{mensagem}</div>}
                {erro && <div className="alert alert-danger">{mensagem}</div>}
            </div>
        );
    }
}

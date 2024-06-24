import React, { Component } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';

type Props = {
    tema: string;
    alterarPet: (petAtualizado: Pet) => void;
    clientes: Cliente[];
    pets: Pet[];
};

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

type State = {
    cpf: string;
    pets: Pet[];
    petsLoaded: boolean;
    petSelecionado: Pet | null;
    nomePet: string;
    raca: string;
    genero: string;
    tipo: string;
    mensagem: string;
    erro: boolean;
};

const initialPetState = {
    nomePet: '',
    raca: '',
    genero: '',
    tipo: '',
};

export default class AlterarPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpf: '',
            pets: [],
            petsLoaded: false,
            petSelecionado: null,
            ...initialPetState,
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

        try {
            const response = await axios.get(`http://localhost:5000/buscarPetPorCpf?cpf=${cpfSemMascara}`);

            if (response.status === 200) {
                const pet = response.data;

                if (!pet) {
                    this.setState({
                        pets: [],
                        petsLoaded: true,
                        mensagem: 'Você não possui nenhum pet cadastrado.',
                    });
                } else {
                    this.setState({
                        pets: [pet], // Coloque o pet retornado em um array para manter consistência com a estrutura esperada no componente
                        petsLoaded: true,
                        mensagem: '',
                    });
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
            });
        }
    };

    handlePetSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { pets } = this.state;
      const petIndex = event.target.selectedIndex - 1;
  
      if (petIndex >= 0 && pets.length > 0) {
          const petSelecionado = pets[petIndex];
          this.setState({
              petSelecionado: {
                  ...petSelecionado,
              },
              nomePet: petSelecionado.nomePet,
              raca: petSelecionado.raca,
              genero: petSelecionado.genero,
              tipo: petSelecionado.tipo,
          });
      } else {
          this.setState({
              petSelecionado: null,
              ...initialPetState,
          });
      }
  };
  

  handlePetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
        petSelecionado: {
            ...prevState.petSelecionado!,
            [name]: value,
        },
    }));
};

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nomePet, raca, genero, tipo, cpf, petSelecionado } = this.state;

        try {
            const response = await axios.put('http://localhost:5000/alterarPet', {
                nomePet,
                raca,
                genero,
                tipo,
                donoCpf: cpf,
                novoNomePet: petSelecionado!.nomePet,
            });

            if (response.status === 200) {
                this.props.alterarPet(petSelecionado!);

                this.setState({
                    ...initialPetState,
                    mensagem: 'Pet alterado com sucesso!',
                    erro: false,
                });
            } else {
                throw new Error('Erro ao alterar pet.');
            }
        } catch (error) {
            console.error('Erro ao alterar pet', error);
            this.setState({ mensagem: 'Erro ao alterar pet.', erro: true });
        }
    };

    render() {
        const { tema, clientes } = this.props;
        const { cpf, pets, petsLoaded, petSelecionado, nomePet, raca, genero, tipo, mensagem, erro } = this.state;

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
                                <option key={index}>{pet.nomePet}</option>
                            ))}
                        </select>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => this.setState({ petSelecionado: null, ...initialPetState })}
                            style={{ background: tema }}
                        >
                            Limpar Seleção
                        </button>
                    </div>
                )}

                {petSelecionado && (
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group mb-3">
                            <label htmlFor="nomePet">Nome do Pet</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome do Pet"
                                aria-label="Nome do Pet"
                                aria-describedby="basic-addon1"
                                name="nomePet"
                                value={nomePet}
                                onChange={this.handlePetChange} // Utiliza handlePetChange para atualizar o petSelecionado
                            />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="raca">Raça</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Raça"
                                aria-label="Raça"
                                aria-describedby="basic-addon1"
                                name="raca"
                                value={raca}
                                onChange={this.handlePetChange} // Utiliza handlePetChange para atualizar o petSelecionado
                            />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="genero">Gênero</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Gênero"
                                aria-label="Gênero"
                                aria-describedby="basic-addon1"
                                name="genero"
                                value={genero}
                                onChange={this.handlePetChange} // Utiliza handlePetChange para atualizar o petSelecionado
                            />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="tipo">Tipo</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tipo"
                                aria-label="Tipo"
                                aria-describedby="basic-addon1"
                                name="tipo"
                                value={tipo}
                                onChange={this.handlePetChange} // Utiliza handlePetChange para atualizar o petSelecionado
                            />
                        </div>
                        <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>
                                Alterar Pet
                            </button>
                        </div>
                        {mensagem && <div className={erro ? 'alert alert-danger' : 'alert alert-success'}>{mensagem}</div>}
                    </form>
                )}

                {petsLoaded && pets.length === 0 && <div className="alert alert-warning">{mensagem}</div>}
            </div>
        );
    }
}

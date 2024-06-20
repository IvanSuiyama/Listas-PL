import React, { Component } from "react";
import axios from "axios";

type Pet = {
    nomePet: string;
    raca: string;
    genero: string;
    tipo: string;
    donoCpf: string;
};

type State = {
    pets: Pet[];
    errorMessage: string;
};

export default class ListaPet extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            pets: [],
            errorMessage: ""
        };
    }

    componentDidMount() {
        this.fetchPets();
    }

    fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost:5000/listaPet");
            console.log("Resposta do backend:", response.data); // Verifique a resposta
            this.setState({ pets: response.data });
        } catch (error) {
            console.error("Erro ao obter pets", error);
            this.setState({ errorMessage: "Erro ao obter pets" });
        }
    };

    render() {
        const { pets, errorMessage } = this.state;

        if (errorMessage) {
            return (
                <div className="container-fluid">
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                </div>
            );
        }

        if (pets.length === 0) {
            return (
                <div className="container-fluid">
                    <div className="alert alert-info" role="alert">
                        Nenhum pet cadastrado.
                    </div>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="list-group">
                    {pets.map((pet, index) => (
                        <div
                            key={index}
                            className="list-group-item list-group-item-action"
                            style={{ marginBottom: "10px" }}
                        >
                            <div>
                                <p><strong>Nome:</strong> {pet.nomePet}</p>
                            </div>
                            <div>
                                <p><strong>Raça:</strong> {pet.raca}</p>
                            </div>
                            <div>
                                <p><strong>Gênero:</strong> {pet.genero}</p>
                            </div>
                            <div>
                                <p><strong>Tipo:</strong> {pet.tipo}</p>
                            </div>
                            <div>
                                <p><strong>CPF do Dono:</strong> {pet.donoCpf}</p>
                                
                            </div>
                            {index !== pets.length - 1 && (
                                <hr style={{ borderColor: "blue" }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

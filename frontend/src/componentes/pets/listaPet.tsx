import React, { Component } from "react";

type Pet = {
    nomePet: string;
    raca: string;
    genero: string;
    tipo: string;
    donoCpf: string;
};

type Props = {
    pets: Pet[];
};

export default class ListaPet extends Component<Props> {
    render() {
        const { pets } = this.props;

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

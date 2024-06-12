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

        return (
            <div className="container-fluid">
                <div className="list-group">
                    {pets.map((pet, index) => (
                        <div
                            key={index}
                            className="list-group-item list-group-item-action"
                        >
                            <div>
                                <strong>Nome:</strong> {pet.nomePet}
                            </div>
                            <div>
                                <strong>Raça:</strong> {pet.raca}
                            </div>
                            <div>
                                <strong>Gênero:</strong> {pet.genero}
                            </div>
                            <div>
                                <strong>Tipo:</strong> {pet.tipo}
                            </div>
                            <div>
                                <strong>cpfDono:</strong> {pet.donoCpf}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

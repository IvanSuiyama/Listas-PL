import React from "react";
import { Link } from "react-router-dom";

type Pet = {
    nome: string;
    raca: string;
    genero: string;
    tipo: string;
};

type Props = {
    pets: Pet[];
};

const ListarPet: React.FC<Props> = ({ pets }) => {
    return (
        <div>
            <h2>Lista de Pets</h2>
            {pets.length === 0 ? (
                <p>Nenhum pet cadastrado.</p>
            ):(
            <ul>
                {pets.map((pet, index) => (
                    <li key={index}>
                        <strong>Nome:</strong> {pet.nome} <br />
                        <strong>Raça:</strong> {pet.raca} <br />
                        <strong>Gênero:</strong> {pet.genero} <br />
                        <strong>Tipo:</strong> {pet.tipo} <br />
                        <Link to={`/atualizar-pet/${index}`}>
                            <button>Alterar</button>
                        </Link>
                        <hr />
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default ListarPet;

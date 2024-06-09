import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type Pet = {
    id: number;
    nome: string;
    raca: string;
    genero: string;
    tipo: string;
};

type Props = {
    pets: Pet[];
    atualizarPet: (id: number, novoPet: Pet) => void;
};

const AtualizarPet: React.FC<Props> = ({ pets, atualizarPet }) => {
    const { id } = useParams<{ id: string | undefined }>();
    const [nome, setNome] = useState("");
    const [raca, setRaca] = useState("");
    const [genero, setGenero] = useState("");
    const [tipo, setTipo] = useState("");

    useEffect(() => {
        if (id === undefined) return; // Verifica se id é undefined antes de prosseguir

        // Encontrar o pet na lista de pets com base no ID
        const pet = pets.find(pet => pet.id === parseInt(id));
        if (pet) {
            setNome(pet.nome);
            setRaca(pet.raca);
            setGenero(pet.genero);
            setTipo(pet.tipo);
        }
    }, [pets, id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const novoPet: Pet = {
            id: parseInt(id || "0"), // Garantir que id seja uma string válida ou "0"
            nome,
            raca,
            genero,
            tipo
        };
        atualizarPet(parseInt(id || "0"), novoPet); // Garantir que id seja uma string válida ou "0"
    };

    return (
        <div>
            <h2>Atualizar Pet</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="raca">Raça:</label>
                    <input
                        type="text"
                        id="raca"
                        value={raca}
                        onChange={(e) => setRaca(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="genero">Gênero:</label>
                    <input
                        type="text"
                        id="genero"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="tipo">Tipo:</label>
                    <input
                        type="text"
                        id="tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
};

export default AtualizarPet;

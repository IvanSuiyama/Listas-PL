import React, { useState } from "react";

type Cliente = {
    nome: string;
    cpf: string;
    pets?: Pet[];  // Adicionamos a propriedade 'pets' à definição de Cliente
};

type Pet = {
    nome: string;
};

type Props = {
    clientes: Cliente[];
    excluirPet: (cpfCliente: string, nomePet: string) => void;
};

const ExcluirPet: React.FC<Props> = ({ clientes, excluirPet }) => {
    const [cpfCliente, setCpfCliente] = useState("");
    const [nomePet, setNomePet] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Verifica se o CPF do cliente está na lista de clientes
        const cliente = clientes.find(cliente => cliente.cpf === cpfCliente);
        if (!cliente) {
            alert("CPF do cliente não encontrado na lista de clientes.");
            return;
        }

        // Verifica se o pet está associado ao CPF do cliente
        const petDoCliente = cliente.pets?.find(pet => pet.nome === nomePet);
        if (!petDoCliente) {
            alert("O pet mencionado não está associado ao CPF do cliente.");
            return;
        }

        excluirPet(cpfCliente, nomePet);
        setCpfCliente("");
        setNomePet("");
    };

    return (
        <div>
            <h2>Excluir Pet</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cpfCliente">CPF do Cliente:</label>
                    <input
                        type="text"
                        id="cpfCliente"
                        value={cpfCliente}
                        onChange={(e) => setCpfCliente(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="nomePet">Nome do Pet:</label>
                    <input
                        type="text"
                        id="nomePet"
                        value={nomePet}
                        onChange={(e) => setNomePet(e.target.value)}
                    />
                </div>
                <button type="submit">Excluir</button>
            </form>
        </div>
    );
};

export default ExcluirPet;


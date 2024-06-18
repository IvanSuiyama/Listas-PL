import React, { useState } from 'react';

function ExcluirPet({ tema, excluirPet, clientes, pets }) {
    const [nomePet, setNomePet] = useState('');
    const [cpf, setCpf] = useState('');
    const [cpfValido, setCpfValido] = useState(false);
    const [petEncontrado, setPetEncontrado] = useState(false);
    const [nomeDono, setNomeDono] = useState('');

    const handleNomePetChange = (event) => {
        setNomePet(event.target.value);
    };

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };

    const validarCpf = () => {
        const cliente = clientes.find(cliente => cliente.cpf === cpf);
        const cpfValido = !!cliente;
        setCpfValido(cpfValido);
        if (!cpfValido) {
            alert("CPF não encontrado!");
            // Limpar os campos relacionados ao pet
            setNomePet('');
            setPetEncontrado(false);
            setNomeDono('');
        } else {
            setNomeDono(cliente.nome);
        }
    };

    const buscarPet = () => {
        const petEncontrado = pets.some(pet => pet.nomePet === nomePet);
        if (petEncontrado) {
            setPetEncontrado(true);
        } else {
            alert("Pet não encontrado!");
            // Limpar os campos relacionados ao pet
            setPetEncontrado(false);
        }
    };

    const handleExcluirPet = () => {
        const confirmacao = window.confirm(`Tem certeza que deseja excluir o pet "${nomePet}" do dono "${nomeDono}"?`);
        if (confirmacao) {
            excluirPet(nomePet, cpf);
            alert("Pet excluído com sucesso!");
            // Limpar os campos após a exclusão
            setNomePet('');
            setCpf('');
            setCpfValido(false);
            setPetEncontrado(false);
            setNomeDono('');
        }
    };

    return (
        <div className="container-fluid">
            {!petEncontrado ? (
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
                        onChange={handleNomePetChange}
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={buscarPet} style={{ background: tema }}>
                        Buscar Pet
                    </button>
                </div>
            ) : (
                <>
                    {!cpfValido ? (
                        <div className="input-group mb-3">
                            <label htmlFor="cpf">CPF do Dono</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="CPF"
                                aria-label="CPF"
                                aria-describedby="basic-addon1"
                                name="cpf"
                                value={cpf}
                                onChange={handleCpfChange}
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={validarCpf} style={{ background: tema }}>
                                Validar CPF
                            </button>
                        </div>
                    ) : (
                        <div className="input-group mb-3">
                            <p>Tem certeza que deseja excluir o pet "{nomePet}" do dono "{nomeDono}"?</p>
                            <button className="btn btn-outline-danger" type="button" onClick={handleExcluirPet} style={{ background: tema }}>
                                Excluir Pet
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ExcluirPet;

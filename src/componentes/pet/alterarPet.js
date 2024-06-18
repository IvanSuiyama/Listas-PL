import React, { useState } from 'react';

function AlterarPet({ tema, alterarPet, clientes, pets }) {
    const [cpf, setCpf] = useState('');
    const [cpfValido, setCpfValido] = useState(false);
    const [nomePet, setNomePet] = useState('');
    const [petEncontrado, setPetEncontrado] = useState(false);
    const [petAtual, setPetAtual] = useState(null);
    const [novoNomePet, setNovoNomePet] = useState('');
    const [novaRaca, setNovaRaca] = useState('');
    const [novoGenero, setNovoGenero] = useState('');
    const [novoTipo, setNovoTipo] = useState('');

    const handleNomePetChange = (event) => {
        setNomePet(event.target.value);
    };

    const buscarPet = () => {
        const petAtual = pets.find(pet => pet.nomePet === nomePet);
        if (petAtual) {
            setPetEncontrado(true);
            setPetAtual(petAtual);
            setNovoNomePet(petAtual.nomePet);
            setNovaRaca(petAtual.raca);
            setNovoGenero(petAtual.genero);
            setNovoTipo(petAtual.tipo);
        } else {
            alert("Pet não encontrado!");
            // Limpar os campos relacionados ao pet
            setPetEncontrado(false);
            setPetAtual(null);
            setNovoNomePet('');
            setNovaRaca('');
            setNovoGenero('');
            setNovoTipo('');
        }
    };

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };

    const validarCpf = () => {
        const cpfValido = clientes.some(cliente => cliente.cpf === cpf);
        setCpfValido(cpfValido);
        if (!cpfValido) {
            alert("CPF não encontrado!");
            // Limpar os campos relacionados ao pet
            setNomePet('');
            setPetEncontrado(false);
            setPetAtual(null);
            setNovoNomePet('');
            setNovaRaca('');
            setNovoGenero('');
            setNovoTipo('');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'novoNomePet':
                setNovoNomePet(value);
                break;
            case 'novaRaca':
                setNovaRaca(value);
                break;
            case 'novoGenero':
                setNovoGenero(value);
                break;
            case 'novoTipo':
                setNovoTipo(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (petAtual) {
            const petAtualizado = { ...petAtual, nomePet: novoNomePet, raca: novaRaca, genero: novoGenero, tipo: novoTipo };
            alterarPet(petAtualizado);
            alert("Pet alterado com sucesso!");
            // Limpar os campos após a submissão
            setNomePet('');
            setPetEncontrado(false);
            setPetAtual(null);
            setNovoNomePet('');
            setNovaRaca('');
            setNovoGenero('');
            setNovoTipo('');
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
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <label htmlFor="novoNomePet">Novo Nome do Pet</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Novo Nome do Pet"
                                    aria-label="Novo Nome do Pet"
                                    aria-describedby="basic-addon1"
                                    name="novoNomePet"
                                    value={novoNomePet}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <label htmlFor="novaRaca">Nova Raça</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nova Raça"
                                    aria-label="Nova Raça"
                                    aria-describedby="basic-addon1"
                                    name="novaRaca"
                                    value={novaRaca}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <label htmlFor="novoGenero">Novo Gênero do Pet</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Novo Gênero do Pet"
                                    aria-label="Novo Gênero do Pet"
                                    aria-describedby="basic-addon1"
                                    name="novoGenero"
                                    value={novoGenero}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <label htmlFor="novoTipo">Novo Tipo do Pet</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Novo Tipo do Pet"
                                    aria-label="Novo Tipo do Pet"
                                    aria-describedby="basic-addon1"
                                    name="novoTipo"
                                    value={novoTipo}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Alterar pet</button>
                            </div>
                        </form>
                    )}
                </>
            )}
        </div>
    );
}

export default AlterarPet;

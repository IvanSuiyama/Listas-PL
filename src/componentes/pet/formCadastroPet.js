import React, { useState } from 'react';

function FormularioCadastroPet({ tema, adicionarPet, clientes }) {
    const [cpf, setCpf] = useState('');
    const [cpfValido, setCpfValido] = useState(false);
    const [nomePet, setNomePet] = useState('');
    const [raca, setRaca] = useState('');
    const [genero, setGenero] = useState('');
    const [tipo, setTipo] = useState('');

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };

    const validarCpf = () => {
        const isValid = isValidCpf(cpf) && clientes.some(cliente => cliente.cpf === cpf);
        setCpfValido(isValid);
    };

    const isValidCpf = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let sum = 0, remainder;
        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        return remainder === parseInt(cpf.substring(10, 11));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'nomePet':
                setNomePet(value);
                break;
            case 'raca':
                setRaca(value);
                break;
            case 'genero':
                setGenero(value);
                break;
            case 'tipo':
                setTipo(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Pet cadastrado com sucesso");

        const novoPet = { nomePet, raca, genero, tipo, donoCpf: cpf };
        adicionarPet(novoPet);

        setNomePet('');
        setRaca('');
        setGenero('');
        setTipo('');
        setCpfValido(false);
        setCpf('');
    };

    return (
        <div className="container-fluid">
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
                        <label htmlFor="nomePet">Nome do Pet</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="NomePet"
                            aria-label="NomePet"
                            aria-describedby="basic-addon1"
                            name="nomePet"
                            value={nomePet}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="raca">Raça</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Raca"
                            aria-label="Raca"
                            aria-describedby="basic-addon1"
                            name="raca"
                            value={raca}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="genero">Gênero do seu pet</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Genero"
                            aria-label="Genero"
                            aria-describedby="basic-addon1"
                            name="genero"
                            value={genero}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="tipo">Tipo do seu pet</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="tipo"
                            aria-label="tipo"
                            aria-describedby="basic-addon1"
                            name="tipo"
                            value={tipo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Cadastrar pet</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default FormularioCadastroPet;

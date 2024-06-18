import React, { useState } from "react";

const FormularioCadastroCliente = ({ tema, adicionarCliente }) => {
    const [nome, setNome] = useState("");
    const [nomeSocial, setNomeSocial] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataEmissao, setDataEmissao] = useState("");

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
        if (name === "nome") setNome(value);
        if (name === "nomeSocial") setNomeSocial(value);
        if (name === "cpf") setCpf(value);
        if (name === "dataEmissao") setDataEmissao(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isValidCpf(cpf)) {
            alert("CPF inválido!");
            return;
        }

        alert("Cliente cadastrado com sucesso!");
        const novoCliente = { nome, nomeSocial, cpf, dataEmissao };
        adicionarCliente(novoCliente);

        setNome("");
        setNomeSocial("");
        setCpf("");
        setDataEmissao("");
    };

    return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        aria-label="Nome"
                        aria-describedby="basic-addon1"
                        name="nome"
                        value={nome}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="nomeSocial">Nome Social</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome social"
                        aria-label="Nome social"
                        aria-describedby="basic-addon1"
                        name="nomeSocial"
                        value={nomeSocial}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CPF"
                        aria-label="CPF"
                        aria-describedby="basic-addon1"
                        name="cpf"
                        value={cpf}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="dataEmissao">Data Emissão do CPF</label>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="data"
                        aria-label="data"
                        aria-describedby="basic-addon1"
                        name="dataEmissao"
                        value={dataEmissao}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Cadastrar</button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCadastroCliente;


import React, { useState } from "react";

export default function AlterarCliente({ tema, alterarCliente, clientes }) {
    const [cpf, setCpf] = useState("");
    const [cpfValido, setCpfValido] = useState(false);
    const [nome, setNome] = useState("");
    const [nomeSocial, setNomeSocial] = useState("");
    const [dataEmissao, setDataEmissao] = useState("");

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };

    const validarCpf = () => {
        const cpfValido = isValidCpf(cpf) && clientes.some(cliente => cliente.cpf === cpf);
        setCpfValido(cpfValido);

        if (cpfValido) {
            const cliente = clientes.find(cliente => cliente.cpf === cpf);
            if (cliente) {
                setNome(cliente.nome);
                setNomeSocial(cliente.nomeSocial);
                setDataEmissao(cliente.dataEmissao);
            }
        } else {
            setNome("");
            setNomeSocial("");
            setDataEmissao("");
        }
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
        if (name === "nome") setNome(value);
        if (name === "nomeSocial") setNomeSocial(value);
        if (name === "dataEmissao") setDataEmissao(value);
        if (name === "cpf") setCpf(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const clienteAtualizado = { nome, nomeSocial, dataEmissao, cpf };
        alterarCliente(clienteAtualizado);
        alert("Cliente alterado com sucesso!");
        setCpf("");
        setCpfValido(false);
        setNome("");
        setNomeSocial("");
        setDataEmissao("");
    };

    return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <label htmlFor="cpf">CPF do Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CPF"
                        aria-label="CPF"
                        aria-describedby="basic-addon1"
                        name="cpf"
                        value={cpf}
                        onChange={handleCpfChange}
                        onBlur={validarCpf}
                        readOnly={cpfValido}
                    />
                    {!cpfValido && (
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={validarCpf}
                            style={{ background: tema }}
                        >
                            Validar CPF
                        </button>
                    )}
                </div>
                {cpfValido && (
                    <>
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
                                placeholder="Nome Social"
                                aria-label="Nome Social"
                                aria-describedby="basic-addon1"
                                name="nomeSocial"
                                value={nomeSocial}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="dataEmissao">Data de Emissão</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Data de Emissão"
                                aria-label="Data de Emissão"
                                aria-describedby="basic-addon1"
                                name="dataEmissao"
                                value={dataEmissao}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <button
                                className="btn btn-outline-secondary"
                                type="submit"
                                style={{ background: tema }}
                            >
                                Alterar Cliente
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

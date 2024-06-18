import React, { useState } from 'react';

function FormularioCadastroProduto({ tema, adicionarProduto }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState(0);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'valor') {
            setValor(parseFloat(value));
        } else if (name === 'nome') {
            setNome(value);
        } else if (name === 'descricao') {
            setDescricao(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Produto cadastrado com sucesso!');
        const novoProduto = { nome, descricao, valor };
        adicionarProduto(novoProduto);
        setNome('');
        setDescricao('');
        setValor(0);
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
                    <label htmlFor="descricao">Descrição</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Descrição"
                        aria-label="Descrição"
                        aria-describedby="basic-addon1"
                        name="descricao"
                        value={descricao}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="valor">Valor</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Valor"
                        aria-label="Valor"
                        aria-describedby="basic-addon1"
                        name="valor"
                        value={valor}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default FormularioCadastroProduto;

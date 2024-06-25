import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnderecoInicial = {
    id: 0,
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    codigoPostal: '',
    informacoesAdicionais: '',
};

const CliInicial = {
    nome: '',
    nomeSocial: '',
    email: '',
    endereco: { ...EnderecoInicial },
    telefones: [],
};

function ClienteFormCadastro() {
    const [cliente, setCliente] = useState(CliInicial);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleEnderecoChange = (e) => {
        const { name, value } = e.target;
        setCliente({
            ...cliente,
            endereco: { ...cliente.endereco, [name]: value },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:32831/cliente/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        })
            .then(response => {
                if (response.ok) {
                    navigate('/listar');
                } else {
                    console.error('Erro ao cadastrar o cliente!');
                }
            })
            .catch(error => console.error('Erro ao cadastrar Cliente', error));
    };

    return (
        <div className="container mt-5">
            <h2>Cadastrar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" name="nome" value={cliente.nome} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nome Social</label>
                    <input type="text" className="form-control" name="nomeSocial" value={cliente.nomeSocial} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={cliente.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Endereço</label>
                    <input type="text" className="form-control mb-2" placeholder="Cidade" name="cidade" value={cliente.endereco.cidade} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control mb-2" placeholder="Estado" name="estado" value={cliente.endereco.estado} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control mb-2" placeholder="Rua" name="rua" value={cliente.endereco.rua} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control mb-2" placeholder="Bairro" name="bairro" value={cliente.endereco.bairro} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control mb-2" placeholder="Numero" name="numero" value={cliente.endereco.numero} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control mb-2" placeholder="CEP" name="codigoPostal" value={cliente.endereco.codigoPostal} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control" placeholder="Informações Adicionais" name="informacoesAdicionais" value={cliente.endereco.informacoesAdicionais} onChange={handleEnderecoChange} />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );
}

export default ClienteFormCadastro;

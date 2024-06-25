import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

function ClienteEditar() {
    const { id } = useParams();
    const [cliente, setCliente] = useState(CliInicial);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:32831/cliente/${id}`)
            .then(response => response.json())
            .then(data => setCliente(data))
            .catch(error => console.error('Houve um erro!', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleEndChange = (e) => {
        const { name, value } = e.target;
        setCliente({
            ...cliente,
            endereco: { ...cliente.endereco, [name]: value },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:32831/cliente/atualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        })
            .then(response => {
                if (response.ok) {
                    navigate('/');
                } else {
                    console.error('Houve um erro ao atualizar o cliente!');
                }
            })
            .catch(error => console.error('Houve um erro!', error));
    };

    return (
        <div className="container mt-5">
            <h2>Editar Cliente</h2>
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
                    <input type="text" className="form-control mb-2" placeholder="Estado" name="estado" value={cliente.endereco.estado} onChange={handleEndChange} />
                    <input type="text" className="form-control mb-2" placeholder="Cidade" name="cidade" value={cliente.endereco.cidade} onChange={handleEndChange} />
                    <input type="text" className="form-control mb-2" placeholder="Bairro" name="bairro" value={cliente.endereco.bairro} onChange={handleEndChange} />
                    <input type="text" className="form-control mb-2" placeholder="Rua" name="rua" value={cliente.endereco.rua} onChange={handleEndChange} />
                    <input type="text" className="form-control mb-2" placeholder="Numero" name="numero" value={cliente.endereco.numero} onChange={handleEndChange} />
                    <input type="text" className="form-control mb-2" placeholder="Cep" name="codigoPostal" value={cliente.endereco.codigoPostal} onChange={handleEndChange} />
                    <input type="text" className="form-control" placeholder="Informações Adicionais" name="informacoesAdicionais" value={cliente.endereco.informacoesAdicionais} onChange={handleEndChange} />
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
}

export default ClienteEditar;

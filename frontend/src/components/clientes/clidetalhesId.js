import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ClienteDetalhesId = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:32831/cliente/${id}`)
            .then(response => response.json())
            .then(data => setCliente(data))
            .catch(error => console.error('Houve um erro!', error));
    }, [id]);

    if (!cliente) {
        return <div>Aguarde</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Detalhes do Cliente</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Informações Pessoais</h5>
                    <p className="card-text"><strong>Nome:</strong> {cliente.nome}</p>
                    <p className="card-text"><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
                    <p className="card-text"><strong>Email:</strong> {cliente.email}</p>
                    <h5 className="card-title mt-4">Endereço</h5>
                    <p className="card-text"><strong>Cidade:</strong> {cliente.endereco.cidade}</p>
                    <p className="card-text"><strong>Estado:</strong> {cliente.endereco.estado}</p>
                    <p className="card-text"><strong>Bairro:</strong> {cliente.endereco.bairro}</p>
                    <p className="card-text"><strong>Rua:</strong> {cliente.endereco.rua}</p>
                    <p className="card-text"><strong>Número:</strong> {cliente.endereco.numero}</p>
                    <p className="card-text"><strong>Código Postal:</strong> {cliente.endereco.codigoPostal}</p>
                    <p className="card-text"><strong>Informações Adicionais:</strong> {cliente.endereco.informacoesAdicionais}</p>
                    <h5 className="card-title mt-4">Telefones</h5>
                    {cliente.telefones.map((telefone, index) => (
                        <div key={index}>
                            <p className="card-text"><strong>Telefone {index + 1}:</strong> {telefone.numero} ({telefone.tipo})</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClienteDetalhesId;

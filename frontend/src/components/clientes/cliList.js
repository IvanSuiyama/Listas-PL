import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ClienteLista() {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:32831/cliente/clientes')
            .then(response => response.json())
            .then(data => setClientes(data))
            .catch(error => console.error('Erro ao buscar Clientes!', error));
    }, []);

    const handleExcluir = (id) => {
        fetch('http://localhost:32831/cliente/excluir', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then(response => {
                if (response.ok) {
                    setClientes(clientes.filter(cliente => cliente.id !== id));
                } else {
                    console.error('Erro ao excluir cliente');
                }
            })
            .catch(error => console.error('Erro ao excluir Clientes', error));
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Clientes</h2>
            <Link to="/cadastrar" className="btn btn-primary mb-3">Cadastrar Novo Cliente</Link>
            <ul className="list-group">
                {clientes.map(cliente => (
                    <li key={cliente.id} className="list-group-item d-flex align-items-center">
                        <div>
                            <h5>{cliente.nome}</h5>
                            <p>Email: {cliente.email}</p>
                        </div>
                        <div>
                            <Link to={`/cliente/${cliente.id}`} className="btn btn-info me-2">Ver Detalhes</Link>
                            <button className="btn" onClick={() => navigate(`/editar/${cliente.id}`)}>Editar</button>
                            <button className="btn" onClick={() => handleExcluir(cliente.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClienteLista;

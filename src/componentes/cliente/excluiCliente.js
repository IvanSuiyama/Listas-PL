import React, { useState } from 'react';

function ExcluirCliente({ tema, excluirCliente, clientes, pets, atualizarPets }) {
    const [cpf, setCpf] = useState('');
    const [cpfValido, setCpfValido] = useState(false);
    const [cliente, setCliente] = useState(null);

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };

    const validarCpf = () => {
        const clienteEncontrado = clientes.find(cliente => cliente.cpf === cpf);
        if (clienteEncontrado) {
            setCpfValido(true);
            setCliente(clienteEncontrado);
        } else {
            alert("CPF não encontrado!");
            // Limpar os campos relacionados ao cliente
            setCpf("");
            setCpfValido(false);
        }
    };

    const handleExcluirCliente = () => {
        if (cliente) {
            const confirmacao = window.confirm(`Tem certeza que deseja excluir o cliente "${cliente.nome}" (${cliente.cpf})? Todos os seus pets serão excluídos junto.`);
            if (confirmacao) {
                excluirCliente(cpf);
                // Remove os pets do cliente da lista de pets
                const petsAtualizados = pets.filter(pet => pet.donoCpf !== cpf);
                // Atualiza a lista de pets no estado do componente pai
                // Para manter a consistência dos dados
                atualizarPets(petsAtualizados);
                alert("Cliente excluído com sucesso!");
                // Limpa o estado após a exclusão
                setCpf("");
                setCpfValido(false);
                setCliente(null);
            }
        } else {
            alert("Cliente não encontrado!");
        }
    };

    return (
        <div className="container-fluid">
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
                />
                <button className="btn btn-outline-secondary" type="button" onClick={validarCpf} style={{ background: tema }}>
                    Validar CPF
                </button>
            </div>
            {cpfValido && (
                <div className="input-group mb-3">
                    <p>Tem certeza que deseja excluir o cliente "{cliente.nome}" ({cliente.cpf})? Todos os seus pets serão excluídos junto.</p>
                    <button className="btn btn-outline-danger" type="button" onClick={handleExcluirCliente} style={{ background: tema }}>
                        Excluir Cliente
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExcluirCliente;

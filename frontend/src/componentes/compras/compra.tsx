import React, { useState } from "react";

type Cliente = {
    nome: string;
    cpf: string;
};

type Produto = {
    nome: string;
    descricao: string;
    valor: number;
};

type Servico = {
    nome: string;
    descricao: string;
    valor: number;
};

type Props = {
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
    registrarCompra: (compra: {
        cpf: string;
        nomeCliente: string;
        itens: {
            nome: string;
            tipo: "produto" | "servico";
            valor: number;
        }[];
    }) => void;
};

const CompraPS: React.FC<Props> = ({ clientes, produtos, servicos, registrarCompra }) => {
    const [cpfSelecionado, setCpfSelecionado] = useState<string>("");
    const [itensSelecionados, setItensSelecionados] = useState<{ nome: string; tipo: "produto" | "servico"; valor: number }[]>([]);

    const handleCpfChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCpfSelecionado(event.target.value);
    };

    const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>, tipo: "produto" | "servico") => {
        const nomeItem = event.target.value;
        const itemSelecionado = tipo === "produto" ? produtos.find(produto => produto.nome === nomeItem) : servicos.find(servico => servico.nome === nomeItem);
        if (itemSelecionado) {
            setItensSelecionados(prevItens => [...prevItens, { nome: itemSelecionado.nome, tipo, valor: itemSelecionado.valor }]);
        }
    };

    const handleRegistrarCompra = () => {
        const clienteSelecionado = clientes.find(cliente => cliente.cpf === cpfSelecionado);
        if (clienteSelecionado && itensSelecionados.length > 0) {
            registrarCompra({
                cpf: clienteSelecionado.cpf,
                nomeCliente: clienteSelecionado.nome,
                itens: itensSelecionados,
            });
            setCpfSelecionado("");
            setItensSelecionados([]);
            alert("Compra concluída com sucesso!");
        } else {
            alert("Selecione um cliente e pelo menos um item para realizar a compra.");
        }
    };

    return (
        <div className="container-fluid">
            <h2>Registrar Compra de Produto ou Serviço</h2>
            <div className="input-group mb-3">
                <label>Cliente:</label>
                <select value={cpfSelecionado} onChange={handleCpfChange}>
                    <option value="">Selecione um cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.cpf} value={cliente.cpf}>
                            {cliente.nome} - CPF: {cliente.cpf}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-group mb-3">
                <label>Produto:</label>
                <select onChange={(e) => handleItemChange(e, "produto")}>
                    <option value="">Selecione um produto</option>
                    {produtos.map(produto => (
                        <option key={produto.nome} value={produto.nome}>
                            {produto.nome} - {produto.descricao} - R$ {produto.valor}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-group mb-3">
                <label>Serviço:</label>
                <select onChange={(e) => handleItemChange(e, "servico")}>
                    <option value="">Selecione um serviço</option>
                    {servicos.map(servico => (
                        <option key={servico.nome} value={servico.nome}>
                            {servico.nome} - {servico.descricao} - R$ {servico.valor}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-group mb-3">
                <button className="btn btn-outline-secondary" onClick={handleRegistrarCompra}>
                    Registrar Compra
                </button>
            </div>
        </div>
    );
};

export default CompraPS;


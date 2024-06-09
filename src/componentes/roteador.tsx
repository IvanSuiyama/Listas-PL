import React, { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ExcluirCliente from "./excluirCliente";
import CadastroPet from "./cadastroPet";
import ListarPet from "./listarPet";
import ExcluirPet from "./excluirPets";
import CadastroProduto from "./cadastroProduto";
import ExcluirProduto from "./excluirProduto";
import AlterarProduto from "./alterarProduto";
import ListarProdutos from "./listarProduto";

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
    pets?: Pet[];
};

type Pet = {
    nome: string;
    raca: string;
    genero: string;
    tipo: string;
};

type Produto = {
    nome: string;
    descricao: string;
    valor: number;
};

type State = {
    tela: string;
    clientes: Cliente[];
    pets: Pet[];
    produtos: Produto[];
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            tela: 'Clientes',
            clientes: [],
            pets: [],
            produtos: []
        };
        this.seletorView = this.seletorView.bind(this);
        this.adicionarCliente = this.adicionarCliente.bind(this);
        this.removerCliente = this.removerCliente.bind(this);
        this.editarCliente = this.editarCliente.bind(this);
        this.adicionarPet = this.adicionarPet.bind(this);
        this.excluirPet = this.excluirPet.bind(this);
        this.adicionarProduto = this.adicionarProduto.bind(this);
        this.excluirProduto = this.excluirProduto.bind(this);
        this.alterarProduto = this.alterarProduto.bind(this);
    }

    seletorView(novaTela: string) {
        this.setState({
            tela: novaTela
        });
    }

    adicionarCliente(cliente: Cliente) {
        this.setState((prevState) => ({
            clientes: [...prevState.clientes, cliente]
        }));
        alert("Cliente cadastrado com sucesso!");
    }

    removerCliente(cpf: string) {
        this.setState((prevState) => {
            const clientes = prevState.clientes.filter(cliente => cliente.cpf !== cpf);
            const pets = prevState.pets.filter(pet => {
                const clienteAssociado = prevState.clientes.find(cliente => cliente.cpf === cpf);
                return !clienteAssociado?.pets?.some(p => p.nome === pet.nome);
            });
            return { clientes, pets };
        });
        alert("Cliente e seus respectivos pets removidos com sucesso!");
    }

    editarCliente(clienteEditado: Cliente) {
        this.setState(prevState => ({
            clientes: prevState.clientes.map(cliente => {
                if (cliente.cpf === clienteEditado.cpf) {
                    return {
                        ...cliente,
                        nome: clienteEditado.nome,
                        nomeSocial: clienteEditado.nomeSocial,
                        cpf: clienteEditado.cpf,
                        dataEmissao: clienteEditado.dataEmissao,
                        pets: cliente.pets
                    };
                }
                return cliente;
            })
        }));
        alert("Cliente editado com sucesso!");
    }

    adicionarPet(pet: Pet, cpfCliente: string) {
        const cliente = this.state.clientes.find(cliente => cliente.cpf === cpfCliente);
        if (!cliente) {
            alert("CPF do cliente não encontrado na lista de clientes.");
            return;
        }

        this.setState((prevState) => ({
            pets: [...prevState.pets, pet]
        }));
        alert("Pet cadastrado com sucesso!");
    }

    excluirPet(cpfCliente: string, nomePet: string) {
        const cliente = this.state.clientes.find(cliente => cliente.cpf === cpfCliente);
        if (!cliente) {
            alert("CPF do cliente não encontrado na lista de clientes.");
            return;
        }

        if (!cliente.pets) {
            alert("O cliente não possui nenhum pet associado.");
            return;
        }

        const petDoCliente = cliente.pets.find(pet => pet.nome === nomePet);
        if (!petDoCliente) {
            alert("O pet mencionado não está associado ao CPF do cliente.");
            return;
        }

        this.setState(prevState => ({
            clientes: prevState.clientes.map(cliente => {
                if (cliente.cpf === cpfCliente) {
                    return {
                        ...cliente,
                        pets: cliente.pets ? cliente.pets.filter(pet => pet.nome !== nomePet) : undefined
                    };
                }
                return cliente;
            })
        }));
        alert("Pet excluído com sucesso!");
    }

    adicionarProduto(produto: Produto) {
        this.setState((prevState) => ({
            produtos: [...prevState.produtos, produto]
        }));
        alert("Produto cadastrado com sucesso!");
    }

    excluirProduto(nomeProduto: string) {
        this.setState((prevState) => ({
            produtos: prevState.produtos.filter(produto => produto.nome !== nomeProduto)
        }));
        alert("Produto excluído com sucesso!");
    }

    alterarProduto(produtoAlterado: Produto) {
        this.setState(prevState => ({
            produtos: prevState.produtos.map(produto => 
                produto.nome === produtoAlterado.nome ? produtoAlterado : produto
            )
        }));
        alert("Produto alterado com sucesso!");
    }

    render() {
        let barraNavegacao = (
            <BarraNavegacao
                seletorView={this.seletorView}
                tema="#e3f2fd"
                botoes={[
                    'Cadastrar Cliente',
                    'Lista Cliente',
                    'Excluir Cliente',
                    'Cadastro Pet',
                    'Listar Pet',
                    'Excluir Pet',
                    'Cadastro Produto',
                    'Listar Produtos',
                    'Excluir Produto',
                    'Alterar Produto'
                ]}
            />
        );

        const { tela, clientes, pets, produtos } = this.state;

        return (
            <>
                {barraNavegacao}
                {tela === 'Lista Cliente' && <ListaCliente tema="#e3f2fd" clientes={clientes} editarCliente={this.editarCliente} />}
                {tela === 'Cadastrar Cliente' && <FormularioCadastroCliente tema="#e3f2fd" adicionarCliente={this.adicionarCliente} />}
                {tela === 'Excluir Cliente' && <ExcluirCliente tema="#e3f2fd" clientes={clientes} removerCliente={this.removerCliente} />}
                {tela === 'Cadastro Pet' && <CadastroPet tema="#e3f2fd" clientes={clientes} adicionarPet={this.adicionarPet} />}
                {tela === 'Listar Pet' && <ListarPet pets={pets} />}
                {tela === 'Excluir Pet' && <ExcluirPet clientes={clientes} excluirPet={this.excluirPet} />}
                {tela === 'Cadastro Produto' && <CadastroProduto adicionarProduto={this.adicionarProduto} />}
                {tela === 'Listar Produtos' && <ListarProdutos produtos={produtos} />} {/* Add new component */}
                {tela === 'Excluir Produto' && <ExcluirProduto produtos={produtos} excluirProduto={this.excluirProduto} />}
                {tela === 'Alterar Produto' && <AlterarProduto produtos={produtos} alterarProduto={this.alterarProduto} />} {/* Add new component */}
            </>
        );
    }
}

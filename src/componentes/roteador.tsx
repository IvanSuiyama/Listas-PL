import React, { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./clientes/listaClientes";
import FormularioCadastroCliente from "./clientes/formularioCadastroCliente";
import FormularioCadastroPet from "./pets/formularioPet";
import ListaPet from "./pets/listaPet";
import AlterarCliente from "./clientes/alterarClienes";
import AlterarPet from "./pets/alterarPet";
import ExcluirPet from "./pets/excluirPet"; 
import ExcluirCliente from "./clientes/excluirCliente";
import Home from "./home"; 
import FormularioCadastroProduto from "./produtos/cadastroProduto";
import ListaProduto from "./produtos/listaProduto";
import AlterarProduto from "./produtos/alteraProduto";
import ExcluirProduto from "./produtos/excluirProduto";

type Produto = {
    nome: string;
    descricao: string;
    valor: number;
}

type Pet = {
    nomePet: string;
    raca: string;
    genero: string;
    tipo: string;
    donoCpf: string;
};

type State = {
    tela: string;
    pets: Pet[];
    clientes: Array<{ nome: string; nomeSocial: string; cpf: string; dataEmissao: string }>;
    produtos: Produto[];
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            tela: 'home', 
            pets: [],
            clientes: [],
            produtos: []
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.adicionarPet = this.adicionarPet.bind(this);
        this.adicionarCliente = this.adicionarCliente.bind(this);
        this.alterarCliente = this.alterarCliente.bind(this);
        this.excluirCliente = this.excluirCliente.bind(this)
        this.alterarPet = this.alterarPet.bind(this);
        this.excluirPet = this.excluirPet.bind(this); 
        this.atualizarPets = this.atualizarPets.bind(this);
        this.adicionarProduto = this.adicionarProduto.bind(this) 
        this.alterarProduto = this.alterarProduto.bind(this);
        this.excluirProduto = this.excluirProduto.bind(this);
    }

    selecionarView(novaTela: string, evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        evento.preventDefault();
        this.setState({
            tela: novaTela
        });
    }
    
    atualizarPets(petsAtualizados: Pet[]) {
        this.setState({ pets: petsAtualizados });
    }

    adicionarPet(novoPet: Pet) {
        this.setState(prevState => ({
            pets: [...prevState.pets, novoPet]
        }));
    }

    adicionarCliente(novoCliente: { nome: string; nomeSocial: string; cpf: string; dataEmissao: string }) {
        this.setState(prevState => ({
            clientes: [...prevState.clientes, novoCliente]
        }));
    }

    alterarCliente(clienteAtualizado: { nome: string; nomeSocial: string; cpf: string; dataEmissao: string }) {
        const { clientes } = this.state;
        const indiceCliente = clientes.findIndex(cliente => cliente.cpf === clienteAtualizado.cpf);
        if (indiceCliente !== -1) {
            const clientesAtualizados = [...clientes];
            clientesAtualizados[indiceCliente] = clienteAtualizado;
            this.setState({ clientes: clientesAtualizados });
        }
    }

    excluirCliente = (cpf: string) => {
        this.setState(prevState => ({
            clientes: prevState.clientes.filter(cliente => cliente.cpf !== cpf)
        }));
    };

    alterarPet(petAtualizado: Pet) {
        const { pets } = this.state;
        const indicePet = pets.findIndex(pet => pet.nomePet === petAtualizado.nomePet);
        if (indicePet !== -1) {
            const petsAtualizados = [...pets];
            petsAtualizados[indicePet] = petAtualizado;
            this.setState({ pets: petsAtualizados });
        }
    }

    excluirPet(nomePet: string, cpf: string) {
        this.setState(prevState => ({
            pets: prevState.pets.filter(pet => pet.nomePet !== nomePet || pet.donoCpf !== cpf)
        }));
    }
    
    adicionarProduto(novoProduto: Produto) {
        this.setState(prevState => ({
            produtos: [...prevState.produtos, novoProduto]
        }));
    }

    alterarProduto(produtoAtualizado: Produto) {
        const { produtos } = this.state;
        const indiceProduto = produtos.findIndex(p => p.nome === produtoAtualizado.nome);
        if (indiceProduto !== -1) {
            const produtosAtualizados = [...produtos];
            produtosAtualizados[indiceProduto] = produtoAtualizado;
            this.setState({ produtos: produtosAtualizados });
        }
    }

    excluirProduto(nomeProduto: string) {
        this.setState(prevState => ({
            produtos: prevState.produtos.filter(produto => produto.nome !== nomeProduto)
        }));
    }

    render() {
        const { tela, pets, clientes, produtos } = this.state;
        const barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
                tema="#e3f2fd"
                esconderHome={tela === 'home'}
                botoes={[
                    'home', // Adicione 'home' como a primeira opção do menu
                    { title: 'Clientes', items: ['cadastroCliente', 'listaCliente', 'alterarCliente', 'excluirCliente'] },
                    { title: 'Pets', items: ['cadastroPet', 'listaPet', 'alterarPet', 'excluirPet'] },
                    { title: 'Produtos', items: ['cadastroProduto', 'listarProduto', 'alterarProduto', 'excluirProduto'] },
                    {title: 'Serviços', items: ['CadastroServiço', 'listarServiço', 'alterarServiço', 'excluirServiço' ]}
                ]} 
            />
        );

        return (
            <>
                {barraNavegacao}
                {tela === 'home' ? (
                    <Home />
                ) : tela === 'cadastroCliente' ? (
                    <FormularioCadastroCliente tema="#e3f2fd" adicionarCliente={this.adicionarCliente} /> 
                ) : tela === 'listaCliente' ? (
                    <ListaCliente clientes={clientes} /> 
                ) : tela === 'alterarCliente' ? (
                    <AlterarCliente tema="#e3f2fd" alterarCliente={this.alterarCliente} clientes={clientes} />
                ) : tela === 'excluirCliente' ? (
                    <ExcluirCliente tema="#e3f2fd" excluirCliente={this.excluirCliente} clientes={clientes} pets={pets} atualizarPets={this.atualizarPets} />
                ) : tela === 'cadastroPet' ? (
                    <FormularioCadastroPet tema="#e3f2fd" adicionarPet={this.adicionarPet} clientes={clientes} />
                ) : tela === 'listaPet' ? (
                    <ListaPet pets={pets} />
                ) : tela === 'alterarPet' ? (
                    <AlterarPet tema="#e3f2fd" alterarPet={this.alterarPet} clientes={clientes} pets={pets} />
                ) : tela === 'excluirPet' ? (
                    <ExcluirPet tema="#e3f2fd" excluirPet={this.excluirPet} clientes={clientes} pets={pets} />
                ) : tela === 'cadastroProduto' ? (
                    <FormularioCadastroProduto tema="#e3f2fd" adicionarProduto={this.adicionarProduto} />
                ) : tela === 'listarProduto' ? (
                    <ListaProduto produtos={produtos} />
                ) : tela === 'alterarProduto' ? (
                    <AlterarProduto tema="#e3f2fd" alterarProduto={this.alterarProduto} produtos={produtos} />
                ) : tela === 'excluirProduto' ? (
                    <ExcluirProduto tema="#e3f2fd" excluirProduto={this.excluirProduto} produtos={produtos} />
                ) : null}
            </>
        );
    }
}

import React, { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./clientes/listaClientes";
import FormularioCadastroCliente from "./clientes/formularioCadastroCliente";
import FormularioCadastroPet from "./pets/formularioPet";
import ListaPet from "./pets/listaPet";
import AlterarCliente from "./clientes/alterarClienes";
import AlterarPet from "./pets/alterarPet";

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
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            tela: 'cadastroCliente',
            pets: [],
            clientes: []
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.adicionarPet = this.adicionarPet.bind(this);
        this.adicionarCliente = this.adicionarCliente.bind(this);
        this.alterarCliente = this.alterarCliente.bind(this);
        this.alterarPet = this.alterarPet.bind(this);
    }

    selecionarView(novaTela: string, evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        evento.preventDefault();
        this.setState({
            tela: novaTela
        });
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

    alterarPet(petAtualizado: Pet) {
        const { pets } = this.state;
        const indicePet = pets.findIndex(pet => pet.nomePet === petAtualizado.nomePet);
        if (indicePet !== -1) {
            const petsAtualizados = [...pets];
            petsAtualizados[indicePet] = petAtualizado;
            this.setState({ pets: petsAtualizados });
        }
    }

    render() {
        const { tela, pets, clientes } = this.state;
        const barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
                tema="#e3f2fd"
                botoes={['cadastroCliente', 'listaCliente', 'alterarCliente', 'cadastroPet', 'listaPet', 'alterarPet']} 
            />
        );

        return (
            <>
                {barraNavegacao}
                {tela === 'cadastroCliente' ? (
                    <FormularioCadastroCliente tema="#e3f2fd" adicionarCliente={this.adicionarCliente} /> 
                ) : tela === 'listaCliente' ? (
                    <ListaCliente clientes={clientes} /> 
                ) : tela === 'alterarCliente' ? (
                    <AlterarCliente tema="#e3f2fd" alterarCliente={this.alterarCliente} clientes={clientes} />
                ) : tela === 'cadastroPet' ? (
                    <FormularioCadastroPet tema="#e3f2fd" adicionarPet={this.adicionarPet} clientes={clientes} />
                ) : tela === 'listaPet' ? (
                    <ListaPet pets={pets} />
                ) : tela === 'alterarPet' ? (
                    <AlterarPet tema="#e3f2fd" alterarPet={this.alterarPet} clientes={clientes} pets={pets} />
                ) : null}
            </>
        );
    }
}

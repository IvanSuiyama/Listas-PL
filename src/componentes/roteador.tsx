import React, { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import FormularioCadastroPet from "./formularioPet";
import ListaPet from "./listaPet";

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
    clientes: Array<{ nome: string; nomeSocial: string; cpf: string; dataEmissao: string }>; // Adicionando a tipagem dos clientes aqui
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            tela: 'cadastroCliente',
            pets: [],
            clientes: [] // Inicialize a lista de clientes vazia
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.adicionarPet = this.adicionarPet.bind(this);
        this.adicionarCliente = this.adicionarCliente.bind(this); // Adicione a função para adicionar cliente
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

    render() {
        const { tela, pets, clientes } = this.state;
        const barraNavegacao = (
            <BarraNavegacao
                seletorView ={this.selecionarView }
                tema="#e3f2fd"
                botoes={['cadastroCliente', 'listaCliente', 'cadastroPet', 'listaPet']}
            />
        );

        return (
            <>
                {barraNavegacao}
                {tela === 'cadastroCliente' ? (
                    <FormularioCadastroCliente tema="#e3f2fd" adicionarCliente={this.adicionarCliente} /> 
                ) : tela === 'listaCliente' ? (
                    <ListaCliente clientes={clientes} /> 
                ) : tela === 'cadastroPet' ? (
                    <FormularioCadastroPet tema="#e3f2fd" adicionarPet={this.adicionarPet} clientes={clientes} />
                ) : tela === 'listaPet' ? (
                    <ListaPet pets={pets} />
                ) : null}
            </>
        );
    }
}

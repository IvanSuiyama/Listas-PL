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
import FormularioCadastroServico from "./servicos/formularioCadastroServico";
import ListarServico from "./servicos/listarServico";
import AlterarServico from "./servicos/alterarServico";
import ExcluirServico from "./servicos/excluirServico";
import CompraPS from "./compras/compra";
import ListaCompras from "./compras/mostraCompra";
import TopClientes from "./registros/top10";
import Top5ServicoseProdutos from "./registros/top5ServicoseProdutos";
import Top5Clientes from "./registros/top5cli";
import TopSePporReT from "./registros/topSePporReT";

type Produto = {
    id?: number;
    nome: string;
    descricao: string;
    valor: number;
};

type Pet = {
    nomePet: string;
    raca: string;
    genero: string;
    tipo: string;
    donoCpf: string;
};

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
};

type Servico = {
    id?:number
    nome: string;
    descricao: string;
    valor: number;
};

type Compra = {
    clienteCpf: string;
    clienteNome: string;
    itens: {
        nome: string;
        tipo: "produto" | "servico";
        valor: number;
    }[];
};

type State = {
    tela: string;
    pets: Pet[];
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
    compras: Compra[];
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tela: "home",
            pets: [],
            clientes: [],
            produtos: [],
            servicos: [],
            compras: [],
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.adicionarPet = this.adicionarPet.bind(this);
        this.adicionarCliente = this.adicionarCliente.bind(this);
        this.alterarCliente = this.alterarCliente.bind(this);
        this.excluirCliente = this.excluirCliente.bind(this);
        this.alterarPet = this.alterarPet.bind(this);
        this.excluirPet = this.excluirPet.bind(this);
        this.atualizarPets = this.atualizarPets.bind(this);
        this.adicionarProduto = this.adicionarProduto.bind(this);
        this.alterarProduto = this.alterarProduto.bind(this);
        this.excluirProduto = this.excluirProduto.bind(this);
        this.adicionarServico = this.adicionarServico.bind(this);
        this.alterarServico = this.alterarServico.bind(this);
        this.excluirServico = this.excluirServico.bind(this);
        this.registrarCompra = this.registrarCompra.bind(this);
    }

    selecionarView(novaTela: string, evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        evento.preventDefault();
        this.setState({
            tela: novaTela,
        });
    }

    atualizarPets(petsAtualizados: Pet[]) {
        this.setState({ pets: petsAtualizados });
    }

    adicionarPet(novoPet: Pet) {
        this.setState((prevState) => ({
            pets: [...prevState.pets, novoPet],
        }));
    }

    adicionarCliente(novoCliente: Cliente) {
        this.setState((prevState) => ({
            clientes: [...prevState.clientes, novoCliente],
        }));
    }

    alterarCliente(clienteAtualizado: Cliente) {
        const { clientes } = this.state;
        const indiceCliente = clientes.findIndex((cliente) => cliente.cpf === clienteAtualizado.cpf);
        if (indiceCliente !== -1) {
            const clientesAtualizados = [...clientes];
            clientesAtualizados[indiceCliente] = clienteAtualizado;
            this.setState({ clientes: clientesAtualizados });
        }
    }

    excluirCliente = (cpf: string) => {
        this.setState((prevState) => ({
            clientes: prevState.clientes.filter((cliente) => cliente.cpf !== cpf),
        }));
    };

    alterarPet(petAtualizado: Pet) {
        const { pets } = this.state;
        const indicePet = pets.findIndex((pet) => pet.nomePet === petAtualizado.nomePet);
        if (indicePet !== -1) {
            const petsAtualizados = [...pets];
            petsAtualizados[indicePet] = petAtualizado;
            this.setState({ pets: petsAtualizados });
        }
    }

    excluirPet(nomePet: string, cpf: string) {
        this.setState((prevState) => ({
            pets: prevState.pets.filter((pet) => pet.nomePet !== nomePet || pet.donoCpf !== cpf),
        }));
    }

    adicionarProduto(novoProduto: Produto) {
        this.setState((prevState) => ({
            produtos: [...prevState.produtos, novoProduto],
        }));
    }

    alterarProduto(produtoAtualizado: Produto) {
        const { produtos } = this.state;
        const indiceProduto = produtos.findIndex((p) => p.nome === produtoAtualizado.nome);
        if (indiceProduto !== -1) {
            const produtosAtualizados = [...produtos];
            produtosAtualizados[indiceProduto] = produtoAtualizado;
            this.setState({ produtos: produtosAtualizados });
        }
    }

    excluirProduto(id_produto: number) {
        this.setState((prevState) => ({
            produtos: prevState.produtos.filter((produto) => produto.id !== id_produto),
        }));
    }

    adicionarServico(novoServico: Servico) {
        this.setState((prevState) => ({
            servicos: [...prevState.servicos, novoServico],
        }));
    }

    alterarServico(servicoAtualizado: Servico) {
        const { servicos } = this.state;
        const indiceServico = servicos.findIndex((s) => s.nome === servicoAtualizado.nome);
        if (indiceServico !== -1) {
            const servicosAtualizados = [...servicos];
            servicosAtualizados[indiceServico] = servicoAtualizado;
            this.setState({ servicos: servicosAtualizados });
        }
    }

    excluirServico(id_servico: number) {
        this.setState((prevState) => ({
            servicos: prevState.servicos.filter((servico) => servico.id !== id_servico),
        }));
    }

    registrarCompra(compra: {
        clienteCpf: string;
        clienteNome: string;
        itens: {
            nome: string;
            tipo: "produto" | "servico";
            valor: number;
        }[];
    }) {
        const novaCompra: Compra = {
            clienteCpf: compra.clienteCpf,
            clienteNome: compra.clienteNome,
            itens: compra.itens,
        };

        // Atualizando o estado de compras adicionando a nova compra
        this.setState((prevState) => ({
            compras: [...prevState.compras, novaCompra],
        }));
    }

    render() {
        const { tela, pets, clientes, produtos, servicos, compras } = this.state;
        const barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
                tema="#e3f2fd"
                esconderHome={tela === "home"}
                botoes={[
                    "home",
                    { title: "Clientes", items: ["cadastroCliente", "listaCliente", "alterarCliente", "excluirCliente"] },
                    { title: "Pets", items: ["cadastroPet", "listaPet", "alterarPet", "excluirPet"] },
                    { title: "Produtos", items: ["cadastroProduto", "listarProduto", "alterarProduto", "excluirProduto"] },
                    { title: "Serviços", items: ["cadastroServico", "listarServico", "alterarServico", "excluirServico"] },
                    { title: "Compras Serviços", items: ["compra", "mostraCompras"] },
                    { title: "Registros", items: ["top10Cli", "Servicos/Produtos mais consumidos", "S/P por tipo raça pet", "Top5 valor"] }
                ]}
            />
        );

        return (
            <>
                {barraNavegacao}
                {tela === "home" ? (
                    <Home />
                ) : tela === "cadastroCliente" ? (
                    <FormularioCadastroCliente tema="#e3f2fd" adicionarCliente={this.adicionarCliente} />
                ) : tela === "listaCliente" ? (
                    <ListaCliente clientes={clientes} />
                ) : tela === "alterarCliente" ? (
                    <AlterarCliente tema="#e3f2fd" alterarCliente={this.alterarCliente} clientes={clientes} />
                ) : tela === "excluirCliente" ? (
                    <ExcluirCliente
                        tema="#e3f2fd"
                        excluirCliente={this.excluirCliente}
                    />
                ) : tela === "cadastroPet" ? (
                    <FormularioCadastroPet tema="#e3f2fd" adicionarPet={this.adicionarPet} clientes={clientes} />
                ) : tela === "listaPet" ? (
                    <ListaPet />
                ) : tela === "alterarPet" ? (
                    <AlterarPet tema="#e3f2fd" alterarPet={this.alterarPet} clientes={clientes} />
                ) : tela === "excluirPet" ? (
                    <ExcluirPet tema="#e3f2fd" excluirPet={this.excluirPet} />
                ) : tela === "cadastroProduto" ? (
                    <FormularioCadastroProduto tema="#e3f2fd" adicionarProduto={this.adicionarProduto} />
                ) : tela === "listarProduto" ? (
                    <ListaProduto produtos={produtos} />
                ) : tela === "alterarProduto" ? (
                    <AlterarProduto tema="#e3f2fd" alterarProduto={this.alterarProduto} />
                ) : tela === "excluirProduto" ? (
                    <ExcluirProduto tema="#e3f2fd" excluirProduto={this.excluirProduto} />
                ) : tela === "cadastroServico" ? (
                    <FormularioCadastroServico tema="#e3f2fd" adicionarServico={this.adicionarServico} />
                ) : tela === "listarServico" ? (
                    <ListarServico servicos={servicos} />
                ) : tela === "alterarServico" ? (
                    <AlterarServico tema="#e3f2fd" alterarServico={this.alterarServico} />
                ) : tela === "excluirServico" ? (
                    <ExcluirServico tema="#e3f2fd" excluirServico={this.excluirServico}  />
                ) : tela === "compra" ? (
                    <CompraPS
                       
                    />
                ) : tela === "mostraCompras" ? (
                    <ListaCompras />
                ) : tela === "top10Cli" ? (
                    <TopClientes />
                ): tela === "Servicos/Produtos mais consumidos" ? (
                    <Top5ServicoseProdutos />
                ) : tela === "Top5 valor" ? (
                    <Top5Clientes />
                ) : tela === "S/P por tipo raça pet" ? (
                    <TopSePporReT />
                ) : null}
            </>
        );
    }
}

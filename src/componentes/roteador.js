import React, { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./cliente/listaCliente";
import FormularioCadastroCliente from "./cliente/formularioCadastroCliente";
import FormularioCadastroPet from "./pet/formCadastroPet";
import ListaPet from "./pet/listapet";
import AlterarCliente from "./cliente/alteraCliente";
import AlterarPet from "./pet/alterarPet";
import ExcluirPet from "./pet/excluirPet";
import ExcluirCliente from "./cliente/excluiCliente";
import Home from "./home";
import FormularioCadastroProduto from "./produto/cadastroProduto";
import ListaProduto from "./produto/listaProduto";
import AlterarProduto from "./produto/alterarProduto";
import ExcluirProduto from "./produto/excluirProduto";
import FormularioCadastroServico from "./servico/cadastroServico";
import ListarServico from "./servico/listaServico";
import AlterarServico from "./alteraServico";
import ExcluirServico from "./servico/excluiServico";
import CompraPS from "./compras/compras";
import ListaCompras from "./compras/mostraCompra"; 

export default function Roteador() {
  const [tela, setTela] = useState("home");
  const [pets, setPets] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [compras, setCompras] = useState([]);  

  const selecionarView = (novaTela, evento) => {
    evento.preventDefault();
    setTela(novaTela);
  };

  const adicionarPet = (novoPet) => {
    setPets((prevPets) => [...prevPets, novoPet]);
  };

  const adicionarCliente = (novoCliente) => {
    setClientes((prevClientes) => [...prevClientes, novoCliente]);
  };

  const alterarCliente = (clienteAtualizado) => {
    setClientes((prevClientes) =>
      prevClientes.map((cliente) =>
        cliente.cpf === clienteAtualizado.cpf ? clienteAtualizado : cliente
      )
    );
  };

  const excluirCliente = (cpf) => {
    setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.cpf !== cpf));
  };

  const alterarPet = (petAtualizado) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.nomePet === petAtualizado.nomePet ? petAtualizado : pet
      )
    );
  };

  const excluirPet = (nomePet, cpf) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.nomePet !== nomePet || pet.donoCpf !== cpf));
  };

  const adicionarProduto = (novoProduto) => {
    setProdutos((prevProdutos) => [...prevProdutos, novoProduto]);
  };

  const alterarProduto = (produtoAtualizado) => {
    console.log("Alterando produto:", produtoAtualizado);
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) =>
        produto.nome === produtoAtualizado.nome ? produtoAtualizado : produto
      )
    );
  };

   const excluirProduto = (nomeProduto) => {
    setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.nome !== nomeProduto));
  };

  const adicionarServico = (novoServico) => {
    setServicos((prevServicos) => [...prevServicos, novoServico]);
  };

   const alterarServico = (servicoAtualizado) => {
    setServicos((prevServicos) =>
      prevServicos.map((servico) =>
        servico.nome === servicoAtualizado.nome ? servicoAtualizado : servico
      )
    );
  };

  const excluirServico = (nomeServico) => {
    setServicos((prevServicos) => prevServicos.filter((servico) => servico.nome !== nomeServico));
  };

  const registrarCompra = (compra) => {
    const novaCompra = {
      clienteCpf: compra.cpf,
      clienteNome: compra.nomeCliente,
      itens: compra.itens,
    };
    setCompras((prevCompras) => [...prevCompras, novaCompra]);
  }; 

  const renderView = () => {
    switch (tela) {
      case "home":
        return <Home />;
      case "cadastroCliente":
        return <FormularioCadastroCliente tema="#e3f2fd" adicionarCliente={adicionarCliente} />;
      case "listaCliente":
        return <ListaCliente clientes={clientes} />;
      case "alterarCliente":
        return <AlterarCliente tema="#e3f2fd" alterarCliente={alterarCliente} clientes={clientes} />;
      case "excluirCliente":
        return (
          <ExcluirCliente
            tema="#e3f2fd"
            excluirCliente={excluirCliente}
            clientes={clientes}
            pets={pets}
            atualizarPets={setPets}
          />
        );
      case "cadastroPet":
        return <FormularioCadastroPet tema="#e3f2fd" adicionarPet={adicionarPet} clientes={clientes} />;
      case "listaPet":
        return <ListaPet pets={pets} />;
      case "alterarPet":
        return <AlterarPet tema="#e3f2fd" alterarPet={alterarPet} clientes={clientes} pets={pets} />;
      case "excluirPet":
        return <ExcluirPet tema="#e3f2fd" excluirPet={excluirPet} clientes={clientes} pets={pets} />;
      case "cadastroProduto":
        return <FormularioCadastroProduto tema="#e3f2fd" adicionarProduto={adicionarProduto} />;
      case "listarProduto":
        return <ListaProduto produtos={produtos} />;
      case "alterarProduto":
        return <AlterarProduto tema="#e3f2fd" alterarProduto={alterarProduto} produtos={produtos} />;
      case "excluirProduto":
        return <ExcluirProduto tema="#e3f2fd" excluirProduto={excluirProduto} produtos={produtos} />;
      case "cadastroServico":
        return <FormularioCadastroServico tema="#e3f2fd" adicionarServico={adicionarServico} />;
      case "listarServico":
        return <ListarServico servicos={servicos} />;
     case "alterarServico":
        return <AlterarServico tema="#e3f2fd" alterarServico={alterarServico} servicos={servicos} />;
      case "excluirServico":
        return <ExcluirServico tema="#e3f2fd" excluirServico={excluirServico} servicos={servicos} />;
      case "compra":
        return <CompraPS clientes={clientes} produtos={produtos} servicos={servicos} registrarCompra={registrarCompra} />;
       case "mostraCompra":
        return <ListaCompras compras={compras} />; 
      default:
        return null;
    }
  };

  return (
    <>
      <BarraNavegacao
        seletorView={selecionarView}
        tema="#e3f2fd"
        esconderHome={tela === "home"}
        botoes={[
          "home",
          { title: "Clientes", items: ["cadastroCliente", "listaCliente", "alterarCliente", "excluirCliente"] },
          { title: "Pets", items: ["cadastroPet", "listaPet", "alterarPet", "excluirPet"] },
          { title: "Produtos", items: ["cadastroProduto", "listarProduto", "alterarProduto", "excluirProduto"] },
          { title: "Serviços", items: ["cadastroServico", "listarServico", "alterarServico", "excluirServico"] },
          { title: "Compras Serviços", items: ["compra", "mostraCompra"] },
        ]}
      />
      {renderView()}
    </>
  );
}

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type props = {
    tema: string,
    botoes: Array<{ title: string, items?: string[] } | string>,
    seletorView: Function,
    esconderHome: boolean // Adiciona a prop esconderHome
}

export default class BarraNavegacao extends Component<props>{
    constructor(props: props | Readonly<props>) {
        super(props)
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this)
    }

    gerarListaBotoes() {
        const { botoes, seletorView, esconderHome } = this.props;
        if (botoes.length <= 0) {
            return <></>
        } else {
            return botoes.map((valor, index) => {
                if (typeof valor === "string") {
                    if (valor === "home" && esconderHome) {
                        return null;
                    }
                    return (
                        <li key={index} className="nav-item">
                            <a className="nav-link" href="#" onClick={(e) => seletorView(valor, e)}>{valor}</a>
                        </li>
                    );
                } else {
                    return (
                        <li key={index} className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id={`navbarDropdown${index}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {valor.title}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby={`navbarDropdown${index}`}>
                                {valor.items?.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <a className="dropdown-item" href="#" onClick={(e) => seletorView(item, e)}>{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                }
            });
        }
    }

    render() {
        let tema = this.props.tema;
        return (
            <>
                <nav className="navbar navbar-expand-lg" data-bs-theme="light" style={{ backgroundColor: tema, marginBottom: 10 }}>
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">PetLovers</span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {this.gerarListaBotoes()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

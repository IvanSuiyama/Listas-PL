import React, { Component } from "react";

type Props = {
    tema: string;
    botoes: string[];
    seletorView: (novaTela: string) => void;
};

export default class BarraNavegacao extends Component<Props> {
    render() {
        const { tema, botoes, seletorView } = this.props;
        return (
            <nav className="navbar navbar-expand-lg" data-bs-theme="light" style={{ backgroundColor: tema, marginBottom: 10 }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">PetLovers</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {botoes.map((botao, index) => (
                                <li key={index} className="nav-item">
                                    <a className="nav-link" href="#" onClick={() => seletorView(botao)}>
                                        {botao}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

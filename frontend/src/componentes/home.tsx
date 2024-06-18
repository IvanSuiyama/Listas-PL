import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div className="container mt-2">
            <div className="jumbotron text-center bg-light p-5 rounded">
                <h1 className="display-4">Bem-vindo ao PetLovers</h1>
                <p className="lead">Estamos sempre dispostos a cuidar do seu pet da melhor maneira possível</p>
                <hr className="my-4" />
                <p>
                    Se você tiver qualquer dúvida, não hesite em nos contatar:
                    <br />
                    <strong>Email: </strong> petLovers@gmail.com
                </p>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <h2>Sobre Nós</h2>
                    <p>
                        Na PetLovers, somos apaixonados por fornecer os melhores cuidados para seus pets.
                        Nossa equipe de especialistas está sempre pronta para ajudar com qualquer necessidade
                        que seu pet possa ter.
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default Home;

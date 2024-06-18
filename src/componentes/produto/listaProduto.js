import React from 'react';

function ListaProduto({ produtos }) {
  return (
    <div className="container-fluid">
      {produtos.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Nenhum produto cadastrado.
        </div>
      ) : (
        <div className="list-group">
          {produtos.map((produto, index) => (
            <div key={index}>
              <div className="list-group-item list-group-item-action">
                <h5>{produto.nome}</h5>
                <p>Descrição: {produto.descricao}</p>
                <p>Valor: R$ {produto.valor.toFixed(2)}</p>
              </div>
              {index !== produtos.length - 1 && <hr style={{ borderColor: 'blue' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaProduto;

function Telefone(id, numero, tipo) {
    this.id = id;
    this.numero = numero;
    this.tipo = tipo;
}

function Endereco(id, estado, cidade, bairro, rua, numero, codigoPostal, informacoesAdicionais) {
    this.id = id;
    this.estado = estado;
    this.cidade = cidade;
    this.bairro = bairro;
    this.rua = rua;
    this.numero = numero;
    this.codigoPostal = codigoPostal;
    this.informacoesAdicionais = informacoesAdicionais;
}

function Cliente(id, nome, nomeSocial, email, endereco, telefones) {
    this.id = id;
    this.nome = nome;
    this.nomeSocial = nomeSocial;
    this.email = email;
    this.endereco = endereco;
    this.telefones = telefones;
}

module.exports = {
    Telefone,
    Endereco,
    Cliente
};

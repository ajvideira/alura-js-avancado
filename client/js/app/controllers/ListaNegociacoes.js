class ListaNegociacoes {

    constructor(armadilha, contexto) {
        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;

        this._armadilha(this, this._contexto);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._armadilha(this, this._contexto);
    }

    esvazia(negociacao) {
        this._negociacoes = [];
        this._armadilha(this, this._contexto);
    }
}
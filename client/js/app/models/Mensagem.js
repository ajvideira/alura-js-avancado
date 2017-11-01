class Mensagem {

    constructor(texto = '') {
        this._texto = texto;
        Object.freeze(this);
    }

    get texto() {
        return this._texto;
    }

}
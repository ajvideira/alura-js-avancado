class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template(model) {
        throw new Error('o método template deve ser implementado na classe filha');
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }

}
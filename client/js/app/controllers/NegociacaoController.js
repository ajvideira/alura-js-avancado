class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this.retornaNegociacao();

        console.log(DateHelper.dataParaTexto(negociacao.data));

        this.limpaCampos();
    }

    retornaNegociacao() {

        let data = DateHelper.textoParaData(this._inputData.value);

        return new Negociacao(data, this._inputQuantidade.value, this._inputValor.value);
    }

    limpaCampos() {
        this._inputData.value = '';
        this._inputQuantidade.value = '';
        this._inputValor.value = '';
        this._inputQuantidade.focus();
    }

}
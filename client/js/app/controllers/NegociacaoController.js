class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#negociacoes-view'));
        this._mensagemView = new MensagemView($('#mensagem-view'));

        this._listaNegociacoes = new ListaNegociacoes(model => {
            this._negociacoesView.update(model);
        });

        this._mensagemView.update(new Mensagem());
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this.retornaNegociacao();
        this._listaNegociacoes.adiciona(negociacao);

        console.log(DateHelper.dataParaTexto(negociacao.data));

        this._mensagemView.update(new Mensagem('Negociação adicionada com sucesso'));

        this._limpaCampos();
    }

    apaga(event) {
        event.preventDefault();

        this._listaNegociacoes.esvazia();
        this._mensagemView.update(new Mensagem('Lista de negociações apagada'));
    }

    retornaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaCampos() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}
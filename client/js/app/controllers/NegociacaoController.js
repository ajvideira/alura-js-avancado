class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#negociacoes-view'));

        this._listaNegociacoes = ProxyFactory.criar(
            new ListaNegociacoes(), ['adiciona', 'esvazia'],
            model => this._negociacoesView.update(model)
        );
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagemView = new MensagemView($('#mensagem-view'));

        this._mensagem = ProxyFactory.criar(
            new Mensagem(), ['texto'],
            model => this._mensagemView.update(model)
        );
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this.retornaNegociacao();
        this._listaNegociacoes.adiciona(negociacao);

        this._mensagem.texto = 'Negociação adicionada com sucesso';

        this._limpaCampos();
    }

    apaga(event) {
        event.preventDefault();

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Lista de negociações apagada';
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
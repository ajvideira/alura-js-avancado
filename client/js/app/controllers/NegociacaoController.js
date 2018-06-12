class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoes-view')),
            'adiciona', 'esvazia'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagem-view')),
            'texto'
        );
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

    importa() {
        let negociacaoService = new NegociacaoService();
        negociacaoService.obterNegociacoes()
            .then(negociacoes => {
                negociacoes
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso';
            }).catch(erro => {
                this._mensagem.texto = erro;
            });
    }

}
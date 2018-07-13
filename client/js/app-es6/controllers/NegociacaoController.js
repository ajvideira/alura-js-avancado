class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoes-view')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagem-view')),
            'texto'
        );

        this.ordemAtual = '';

        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    _init() {
        this._negociacaoService.listaTodos()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)
                )
            ).catch(erro => this._mensagem.texto = erro);

        setInterval(() => {
            this._negociacaoService.importa(this._listaNegociacoes.negociacoes)
                .then(negociacoes => {
                    negociacoes.forEach(negociacao =>
                        this._listaNegociacoes.adiciona(negociacao)
                    );
                    this._mensagem.texto = 'Negociações do período importadas com sucesso';
                })
                .catch(erro => {
                    this._mensagem.texto = erro;
                })
        }, 3000);
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this.retornaNegociacao();

        this._negociacaoService.adiciona(negociacao)
            .then(() => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociação adicionada com sucesso';
                this._limpaCampos();
            }).catch(erro => {
                console.log(erro);
                this._mensagem.texto = 'Não foi possível adicionar a negociação';
            });
    }

    apaga(event) {
        event.preventDefault();

        this._negociacaoService.apagaTodos()
            .then(() => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = 'Negociações apagadas com sucesso';
            }).catch(erro => {
                console.log(erro);
                this._mensagem.texto = 'Não foi possível apagar as negociações';
            });
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

    ordena(coluna) {
        if (this.ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this.ordemAtual = coluna;
    }

}
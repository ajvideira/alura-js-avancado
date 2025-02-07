'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoes-view')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem-view')), 'texto');

        this.ordemAtual = '';

        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._negociacaoService.listaTodos().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });

            setInterval(function () {
                _this._negociacaoService.importa(_this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                    negociacoes.forEach(function (negociacao) {
                        return _this._listaNegociacoes.adiciona(negociacao);
                    });
                    _this._mensagem.texto = 'Negociações do período importadas com sucesso';
                }).catch(function (erro) {
                    _this._mensagem.texto = erro;
                });
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this.retornaNegociacao();

            this._negociacaoService.adiciona(negociacao).then(function () {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = 'Negociação adicionada com sucesso';
                _this2._limpaCampos();
            }).catch(function (erro) {
                console.log(erro);
                _this2._mensagem.texto = 'Não foi possível adicionar a negociação';
            });
        }
    }, {
        key: 'apaga',
        value: function apaga(event) {
            var _this3 = this;

            event.preventDefault();

            this._negociacaoService.apagaTodos().then(function () {
                _this3._listaNegociacoes.esvazia();
                _this3._mensagem.texto = 'Negociações apagadas com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                _this3._mensagem.texto = 'Não foi possível apagar as negociações';
            });
        }
    }, {
        key: 'retornaNegociacao',
        value: function retornaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);
        }
    }, {
        key: '_limpaCampos',
        value: function _limpaCampos() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {
            if (this.ordemAtual == coluna) {
                this._listaNegociacoes.inverteOrdem();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this.ordemAtual = coluna;
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this.http = new HttpClient();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacoesSemana(), this.obterNegociacoesSemanaAnterior(), this.obterNegociacoesSemanaRetrasada()]).then(function (periodos) {
                return periodos.reduce(function (arrayAchatado, array) {
                    return arrayAchatado.concat(array);
                }, []);
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'obterNegociacoesSemana',
        value: function obterNegociacoesSemana() {
            return this.http.get('negociacoes/semana').then(function (negociacoes) {
                return negociacoes.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });
        }
    }, {
        key: 'obterNegociacoesSemanaAnterior',
        value: function obterNegociacoesSemanaAnterior() {
            return this.http.get('negociacoes/anterior').then(function (negociacoes) {
                return negociacoes.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });
        }
    }, {
        key: 'obterNegociacoesSemanaRetrasada',
        value: function obterNegociacoesSemanaRetrasada() {
            return this.http.get('negociacoes/retrasada').then(function (negociacoes) {
                return negociacoes.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });
        }
    }, {
        key: 'adiciona',
        value: function adiciona(negociacao) {
            return ConnectionFactory.getConnection().then(function (conexao) {
                return new NegociacaoDao(conexao);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {
            return ConnectionFactory.getConnection().then(function (conexao) {
                return new NegociacaoDao(conexao);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'apagaTodos',
        value: function apagaTodos() {
            return ConnectionFactory.getConnection().then(function (conexao) {
                return new NegociacaoDao(conexao);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExistente) {
                        return negociacaoExistente.equals(negociacao);
                    });
                });
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map
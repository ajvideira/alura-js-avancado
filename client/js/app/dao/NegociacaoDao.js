'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                request.onsuccess = function (e) {
                    resolve();
                };

                request.onerrror = function (e) {
                    reject(e.target.error);
                };
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var negociacoes = [];

                var request = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                request.onsuccess = function (e) {
                    var atual = e.target.result;

                    if (atual) {
                        var objeto = atual.value;
                        negociacoes.push(new Negociacao(objeto._data, objeto._quantidade, objeto._valor));
                        atual.continue();
                    } else {
                        resolve(negociacoes);
                    }
                };

                request.onerrror = function (e) {
                    console.log(e.target.result);
                    reject('Não foi possível recuperar as negociações');
                };
            });
        }
    }, {
        key: 'apagaTodos',
        value: function apagaTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                request.onsuccess = function (e) {
                    resolve();
                };

                request.onerrror = function (e) {
                    console.log(e.target.result);
                    reject('Não foi possível apagar as negociações');
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map
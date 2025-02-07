'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFactory = function () {
    var dbName = 'aluraframe';
    var version = 5;
    var stores = ['negociacoes'];

    var close = null;
    var connection = null;

    return function () {
        function ConnectionFactory() {
            _classCallCheck(this, ConnectionFactory);

            throw new Error('Não é permitido instanciar ConnectionFactory, utilize de forma estática.');
        }

        _createClass(ConnectionFactory, null, [{
            key: 'getConnection',
            value: function getConnection() {
                var _this = this;

                return new Promise(function (resolve, reject) {
                    if (connection) {
                        resolve(connection);
                    } else {
                        _this._openConnection().then(function (createdConnection) {
                            close = createdConnection.close.bind(createdConnection);
                            createdConnection.close = function () {
                                throw new Error('Não é possível fechar a conexão diretamente');
                            };
                            connection = createdConnection;
                            resolve(connection);
                        }).catch(function (erro) {
                            reject(erro);
                        });
                    }
                });
            }
        }, {
            key: '_openConnection',
            value: function _openConnection() {
                return new Promise(function (resolve, reject) {
                    var openRequest = window.indexedDB.open(dbName, version);

                    openRequest.onupgradeneeded = function (e) {
                        console.log('Banco criado com sucesso');
                        stores.forEach(function (store) {
                            if (e.target.result.objectStoreNames.contains(store)) {
                                e.target.result.deleteObjectStore(store);
                            }
                            e.target.result.createObjectStore(store, {
                                autoIncrement: true
                            });
                        });
                    };

                    openRequest.onsuccess = function (e) {
                        console.log('Conexão recuperada com sucesso');
                        resolve(e.target.result);
                    };

                    openRequest.onerror = function (e) {
                        console.log(e.target.error);
                        reject(e.target.error.name);
                    };
                });
            }
        }, {
            key: 'closeConnection',
            value: function closeConnection() {
                if (connection) {
                    close();
                    connection = null;
                } else {
                    throw new Error('Conexão já fechada');
                }
            }
        }]);

        return ConnectionFactory;
    }();
}();
//# sourceMappingURL=ConnectionFactory.js.map
var ConnectionFactory = (function () {
    const dbName = 'aluraframe';
    const version = 5;
    const stores = ['negociacoes'];

    let close = null;
    let connection = null;

    return class ConnectionFactory {
        constructor() {
            throw new Error('Não é permitido instanciar ConnectionFactory, utilize de forma estática.')
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                if (connection) {
                    resolve(connection);
                } else {
                    this._openConnection()
                        .then(createdConnection => {
                            close = createdConnection.close.bind(createdConnection);
                            createdConnection.close = () => {
                                throw new Error('Não é possível fechar a conexão diretamente');
                            };
                            connection = createdConnection;
                            resolve(connection);
                        })
                        .catch(erro => {
                            reject(erro);
                        });
                }
            });
        }

        static _openConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    console.log('Banco criado com sucesso');
                    stores.forEach(store => {
                        if (e.target.result.objectStoreNames.contains(store)) {
                            e.target.result.deleteObjectStore(store);
                        }
                        e.target.result.createObjectStore(store, {
                            autoIncrement: true
                        });
                    });
                };

                openRequest.onsuccess = e => {
                    console.log('Conexão recuperada com sucesso');
                    resolve(e.target.result);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }

        static closeConnection() {
            if (connection) {
                close();
                connection = null;
            } else {
                throw new Error('Conexão já fechada');
            }
        }
    }
})();
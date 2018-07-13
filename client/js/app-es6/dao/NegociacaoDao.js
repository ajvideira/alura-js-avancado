class NegociacaoDao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {
                resolve();
            };

            request.onerrror = e => {
                reject(e.target.error);
            };
        });
    }

    listaTodos() {
        return new Promise((resolve, reject) => {
            let negociacoes = [];

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            request.onsuccess = e => {
                let atual = e.target.result;

                if (atual) {
                    let objeto = atual.value;
                    negociacoes.push(new Negociacao(objeto._data, objeto._quantidade, objeto._valor));
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            };

            request.onerrror = e => {
                console.log(e.target.result);
                reject('Não foi possível recuperar as negociações');
            };
        });
    }

    apagaTodos() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => {
                resolve();
            };

            request.onerrror = e => {
                console.log(e.target.result);
                reject('Não foi possível apagar as negociações');
            };
        });
    }
}
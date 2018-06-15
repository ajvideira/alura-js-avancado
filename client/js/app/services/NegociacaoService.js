class NegociacaoService {

    constructor() {
        this.http = new HttpClient();
    }

    obterNegociacoes() {
        return Promise.all([
                this.obterNegociacoesSemana(),
                this.obterNegociacoesSemanaAnterior(),
                this.obterNegociacoesSemanaRetrasada()
            ])
            .then(periodos =>
                periodos.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
            ).catch(erro => {
                throw new Error(erro);
            });
    }

    obterNegociacoesSemana() {
        return this.http.get('negociacoes/semana')
            .then(negociacoes =>
                negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });
    }

    obterNegociacoesSemanaAnterior() {
        return this.http.get('negociacoes/anterior')
            .then(negociacoes =>
                negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });
    }

    obterNegociacoesSemanaRetrasada() {
        return this.http.get('negociacoes/retrasada')
            .then(negociacoes =>
                negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });
    }

    adiciona(negociacao) {
        return ConnectionFactory.getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.adiciona(negociacao))
            .catch(erro => {
                throw new Error(erro);
            });
    }

    listaTodos() {
        return ConnectionFactory.getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                throw new Error(erro);
            });
    }

    apagaTodos() {
        return ConnectionFactory.getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.apagaTodos())
            .catch(erro => {
                throw new Error(erro);
            });
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes
                .filter(negociacao => !listaAtual.some(negociacaoExistente =>
                    negociacaoExistente.equals(negociacao)
                ))
            )
            .catch(erro => {
                throw new Error(erro);
            });
    }

}
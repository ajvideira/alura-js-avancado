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
            .then(periodos => {
                return periodos
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array), []);
            }).catch(erro => {
                throw new Error(erro);
            });
    }

    obterNegociacoesSemana() {
        return this.http.get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            }).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });
    };

    obterNegociacoesSemanaAnterior() {
        return this.http.get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            }).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });
    };

    obterNegociacoesSemanaRetrasada() {
        return this.http.get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            }).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });
    };

}
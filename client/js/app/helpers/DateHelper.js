class DateHelper {

    constructor() {
        throw new Error('Essa classe não pode ser instanciada');
    }

    static dataParaTexto(data) {
        return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    }

    static textoParaData(texto) {
        return new Date(
            ...texto
            .split('-')
            .map((item, i) => item - i % 2)
        );
    }

}
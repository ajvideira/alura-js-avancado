class DateHelper {

    constructor() {
        throw new Error('Essa classe não pode ser instanciada');
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {

        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) {
            throw new Error('Deve estar no formato dd/mm/aaaa');
        }

        return new Date(
            ...texto
            .split('/')
            .map((item, i) => item - i % 2)
            .reverse()
        );
    }

}
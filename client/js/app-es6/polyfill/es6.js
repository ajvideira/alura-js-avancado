if (!Array.prototype.includes) {
    Array.prototype.includes = function () {
        return this.indexOf(elemento) != -1;
    };
}
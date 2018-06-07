class Bind {
    constructor(objeto, view, ...props) {
        let proxy = ProxyFactory.criar(objeto, props, model => {
            view.update(model);
        });
        view.update(objeto);
        return proxy;
    }
}
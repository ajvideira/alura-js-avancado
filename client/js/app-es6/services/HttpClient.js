class HttpClient {

    _handleErrors(res) {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res;
    }

    get(url) {
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url, dado) {
        return fetch(url, {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(dado)
            })
            .then(res => this._handleErrors(res))
            .then(res => res.text());
    }
}
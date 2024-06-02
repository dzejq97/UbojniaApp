interface IFetchData {
    method: 'POST' | 'GET',
    body?: BodyInit,
}

export default (endpoint: string, data: IFetchData): Promise<Response> => {
    const res = fetch(`http://localhost:5003${endpoint}`, {
        method: data.method,
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: data.body
    })
    return res;
}
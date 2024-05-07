const API = "http://localhost:3333/";

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
    return fetch(endpoint(path)).then((res) => res.json());
};

const post = async (
    path: string,
    name: string,
    price: number,
    amount: number,
    description: string,
    active: boolean,
    categoria_id: number
): Promise<any> => {
    return fetch(endpoint(path), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            price: price,
            amount: amount,
            description: description,
            active: active,
            categoria_id: categoria_id,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error(`Erro ao criar o recurso: ${error.message}`);
        });
};

const put = async (
    path: string,
    name: string,
    price: number,
    amount: number,
    description: string,
    active: boolean,
    categoria_id: number
): Promise<any> => {
    return fetch(endpoint(path), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            price: price,
            amount: amount,
            description: description,
            active: active,
            categoria_id: categoria_id,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error(`Erro ao atualizar a cor: ${error.message}`);
        });
};

const drop = async (path: string): Promise<any> => {
    return fetch(endpoint(path), {
        method: "DELETE",
        headers: {},
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error(`Erro ao excluir objeto: ${error.message}`);
        });
};

export const getProdutos = async () => {
    return get("api/produtos");
};

export const updateProduto = async (
    id: number,
    name: string,
    price: number,
    amount: number,
    description: string,
    active: boolean,
    categoria_id: number
) => {
    return put(
        `api/produtos/${id}`,
        name,
        price,
        amount,
        description,
        active,
        categoria_id
    );
};

export const deleteProduto = async (id: number) => {
    return drop(`api/produtos/${id}`);
};

export const createNewProduto = async (
    name: string,
    price: number,
    amount: number,
    description: string,
    active: boolean,
    categoria_id: number
) => {
    return post(
        `api/produtos`,
        name,
        price,
        amount,
        description,
        active,
        categoria_id
    );
};

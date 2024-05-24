const API = "http://localhost:3333/";

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
    return fetch(endpoint(path)).then((res) => res.json());
};

const post = async (
    path: string,
    name_class: string,
    description_class: string,
    active_class: boolean
): Promise<any> => {
    return fetch(endpoint(path), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name_class: name_class,
            description_class: description_class,
            active_class: active_class,
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
    name_class: string,
    description_class: string,
    active_class: boolean
): Promise<any> => {
    return fetch(endpoint(path), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name_class: name_class,
            description_class: description_class,
            active_class: active_class,
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

export const getCategorias = async () => {
    return get("api/categorias");
};

export const getCategoria = async (id: string) => {
    return get(`api/categorias/${id} `);
};

export const updateCategoria = async (
    id: number,
    name_class: string,
    description_class: string,
    active_class: boolean
) => {
    return put(
        `api/categorias/${id}`,
        name_class,
        description_class,
        active_class
    );
};

export const deleteCategoria = async (id: number) => {
    return drop(`api/categorias/${id}`);
};

export const createNewCategoria = async (
    name_class: string,
    description_class: string,
    active_class: boolean
) => {
    return post(`api/categorias`, name_class, description_class, active_class);
};

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editar.scss";
import { IProdutos } from "../../../types/Produto";
import {
    updateProduto,
    getProdutos,
    getProduto,
} from "../../../lib/apiProduto";

const EditarProduto: React.FC = () => {
    const { id } = useParams<{ id: string | undefined }>();

    const navigate = useNavigate();

    const [produto, setProduto] = useState<IProdutos>();

    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                if (id) {
                    const payload = await getProduto(id);
                    setProduto(payload.data);
                } else {
                    throw new Error("ID do produto não definido");
                }
            } catch (error) {
                console.error("Erro ao obter o produto:", error);
                setErro("Erro ao carregar o produto");
            }
        };
        fetchProduto();
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newValue = name === "active" ? value === "true" : value;

        setProduto((prevProduto) => ({
            ...prevProduto!,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:3333/api/produtos/${id}`,
                {
                    method: "put",
                    body: JSON.stringify(produto),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                navigate("/produtos");
            } else {
                const data = await response.json();
                if (data.error) {
                    setErro(data.error);
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErro(error.message);
            }
        }
    };

    const handleSaveClick = async () => {
        try {
            if (produto) {
                const response = await updateProduto(
                    produto.id,
                    produto.name,
                    produto.price,
                    produto.amount,
                    produto.description,
                    produto.active,
                    produto.categoria_id
                );
                if (response.ok) {
                    navigate("/produtos");
                } else {
                    throw new Error("Erro ao atualizar o produto");
                }
            } else {
                throw new Error("Produto não definido");
            }
        } catch (error) {
            console.error("Erro ao salvar a edição na API:", error);
        }
    };

    if (!produto) {
        // Adicionar verificação para renderizar enquanto os dados estão sendo carregados
        return <div>Carregando...</div>;
    }

    return (
        <form onSubmit={handleSaveClick}>
            <fieldset>
                <legend>Atualizar Produto</legend>
                <div className="produto-update">
                    <label htmlFor="nome">Nome </label>
                    <br />
                    <input
                        type="text"
                        id="nome"
                        name="name"
                        placeholder="Nome"
                        minLength={1}
                        maxLength={100}
                        required
                        value={produto.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="produto-insert">
                    <label htmlFor="price">Preço</label>
                    <br />
                    <input
                        type="text"
                        id="price"
                        name="price"
                        placeholder="Preço"
                        minLength={1}
                        maxLength={30}
                        required
                        value={produto.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="produto-insert">
                    <label htmlFor="amount">Quantidade</label>
                    <br />
                    <input
                        type="text"
                        id="amount"
                        name="amount"
                        placeholder="Quantidade"
                        minLength={1}
                        maxLength={30}
                        required
                        value={produto.amount}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="produto-insert">
                    <label htmlFor="description">Descrição</label>
                    <br />
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Descrição"
                        minLength={1}
                        maxLength={100}
                        required
                        value={produto.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="produto-insert">
                    <label>
                        <input
                            type="radio"
                            name="active"
                            value="true"
                            checked={produto.active === true}
                            onChange={handleInputChange}
                        />
                        Ativo
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="active"
                            value="false"
                            checked={produto.active === false}
                            onChange={handleInputChange}
                        />
                        Inativo
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Atualizar
                </button>
            </fieldset>
        </form>
    );
};

export default EditarProduto;

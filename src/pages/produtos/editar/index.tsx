import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editar.scss";
import { IProdutos } from "../../../types/Produto";

const EditarProduto: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [produto, setProduto] = useState<IProdutos>();

    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3333/api/produtos/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Falha ao carregar os dados");
                }
                return response.json();
            })
            .then((data: IProdutos) => {
                console.log(data);
                setProduto(data);
            })

            .catch((error) => setErro(error.message));
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

    if (!produto) {
        // Adicionar verificação para renderizar enquanto os dados estão sendo carregados
        return <div>Carregando...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
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
                        minLength={3}
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

import React, { Component, ChangeEvent, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import "./criar.scss";
import { IProdutos } from "../../../types/Produto";

interface CriarProdutoProps {}

const CriarProduto: React.FC<CriarProdutoProps> = () => {
    const [produto, setProduto] = React.useState<IProdutos>({
        id: 0,
        name: "",
        price: 0,
        amount: 0,
        description: "",
        categoria_id: 0,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const [erro, setErro] = React.useState<string | null>(null);
    const [redirect, setRedirect] = React.useState<boolean>(false);

    const exibeErro = () => {
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newValue = name === "active" ? value === "true" : value;
        setProduto((prevProduto) => ({
            ...prevProduto,
            [name]: newValue,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        fetch("http://localhost:3003/api/produtos", {
            method: "post",
            body: JSON.stringify(produto),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    setRedirect(true);
                } else {
                    response.json().then((data) => {
                        if (data.error) {
                            setErro(data.error);
                        }
                    });
                }
            })
            .catch((error) => {
                setErro(error.message);
            });
    };

    if (redirect) {
        return <Navigate to="/produtos" />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Criar Produto</legend>
                <div className="produto-insert">
                    <label htmlFor="name">Nome </label>
                    <br />
                    <input
                        type="text"
                        id="name"
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
                    Cadastrar
                </button>
            </fieldset>
        </form>
    );
};

export default CriarProduto;

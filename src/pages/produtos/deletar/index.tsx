import React, { useState, useEffect, MouseEvent } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import "./deletar.scss";

import { IProdutos } from "../../../types/Produto";
import { deleteProduto } from "../../../lib/api";

const DeletarProduto: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [produto, setProduto] = useState<IProdutos>({
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
    const [erro, setErro] = useState<string | null>(null);
    const [redirect, setRedirect] = useState<boolean>(false);

    useEffect(() => {
        fetch(`http://localhost:3333/api/produtos/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Falha ao carregar os dados");
                }
                return response.json();
            })
            .then((data: IProdutos) => {
                setProduto(data);
            })
            .catch((error) => setErro(error.message));
    }, [id]);

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await fetch(
                `http://localhost:3333/api/produtos/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (response.ok) {
                setRedirect(true);
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

    if (redirect) {
        return <Navigate to="/produtos" />;
    }

    return (
        <fieldset>
            <legend>Deletar Produto</legend>
            <div className="produto-delete">
                <label htmlFor="name">{produto.name} </label>
                <p>Tem certeza que deseja deletar este registro?</p>
                {erro && (
                    <div className="alert alert-danger" role="alert">
                        Erro de conexão com o servidor
                    </div>
                )}

                <button onClick={handleClick}>Remover</button>
                <br />
                <br />
                <Link to={`/produtos`}>Voltar</Link>
            </div>
        </fieldset>
    );
};

export default DeletarProduto;

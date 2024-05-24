import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { IProdutos } from "../../../types/Produto";
import { ICategoria } from "../../../types/Categoria";
import { getCategorias } from "../../../lib/apiCategoria";
import { getProdutos } from "../../../lib/apiProduto";

const Main: React.FC = () => {
    const [produtos, setProdutos] = useState<IProdutos[]>([]);
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchProdutos = async () => {
            const payload = await getProdutos();
            setProdutos(payload.data);
        };
        const fetchCategorias = async () => {
            try {
                const categoriasPayload = await getCategorias();
                setCategorias(categoriasPayload.data);
            } catch (error) {
                setErro("Erro ao buscar categorias");
            }
        };
        fetchProdutos();
        fetchCategorias();
    }, []);

    const getCategoriaName = (id: number) => {
        const categoria = categorias.find((categoria) => categoria.id === id);
        return categoria ? categoria.name_class : "Desconhecida";
    };

    if (erro) {
        return <div>Erro: {erro}</div>;
    }

    return (
        <div className="produto-list">
            <Link to={`/criarProduto`}>
                {" "}
                <button type="button" className="btn btn-success">
                    Novo
                </button>{" "}
            </Link>
            <br />
            <br />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Ativo</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto, index) => (
                        <tr key={index}>
                            <th scope="row">{produto.id}</th>
                            <td>{produto.name}</td>
                            <td>
                                {produto.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </td>
                            <td>{produto.amount}</td>
                            <td>{produto.description}</td>
                            <td>{getCategoriaName(produto.categoria_id)}</td>
                            <td>{produto.active ? "Sim" : "Não"}</td>
                            <td>
                                <Link to={`/produtos/${produto.id}`}>
                                    {" "}
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Detalhes
                                    </button>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/editarProduto/${produto.id}`}>
                                    {" "}
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                    >
                                        Atualizar
                                    </button>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/deletarProduto/${produto.id}`}>
                                    {" "}
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                    >
                                        Excluir
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Main;

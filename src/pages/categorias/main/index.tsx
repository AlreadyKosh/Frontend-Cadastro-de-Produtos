import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./main.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import { ICategoria } from "../../../types/Categoria";
import { getCategorias } from "../../../lib/apiCategoria";

const Main: React.FC = () => {
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            const payload = await getCategorias();
            console.log(categorias);
            setCategorias(payload.data);
        };
        fetchCategorias();
    }, []);

    return (
        <div className="categoria-list">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome da Categoria</th>
                        <th scope="col">Descrição da Categoria</th>
                        <th scope="col">Ativo</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria, index) => (
                        <tr key={index}>
                            <th scope="row">{categoria.id}</th>
                            <td>{categoria.name_class}</td>
                            <td>{categoria.description_class}</td>
                            <td>{categoria.active_class ? "Sim" : "Não"}</td>
                            <td>
                                {" "}
                                <Link to={`/categorias/${categoria.id}`}>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Detalhes
                                    </button>{" "}
                                </Link>{" "}
                            </td>
                            <td>
                                {" "}
                                <Link to={`/editarCategoria/${categoria.id}`}>
                                    {" "}
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                    >
                                        Atualizar
                                    </button>{" "}
                                </Link>
                            </td>
                            <td>
                                {" "}
                                <Link to={`/deletarCategoria/${categoria.id}`}>
                                    {" "}
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                    >
                                        Excluir
                                    </button>{" "}
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

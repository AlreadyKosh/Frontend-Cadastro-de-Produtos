import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
    return (
        <div className="opcoes-list">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center mb-5">
                        <h4>Escolha uma das opções abaixo</h4>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-3 d-flex justify-content-center">
                        <Link to={`/categorias`}>
                            {" "}
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                            >
                                Ver Categorias
                            </button>{" "}
                        </Link>
                    </div>

                    <div className="col-3 d-flex justify-content-center">
                        <Link to={`/produtos`}>
                            {" "}
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                            >
                                Ver Produtos
                            </button>{" "}
                        </Link>
                    </div>

                    <div className="col-3 d-flex justify-content-center">
                        <Link to={`/criarProduto`}>
                            {" "}
                            <button
                                type="button"
                                className="btn btn-outline-success"
                            >
                                Criar Novo Produto
                            </button>{" "}
                        </Link>
                    </div>

                    <div className="col-3 d-flex justify-content-center">
                        <Link to={`/criarCategoria`}>
                            <button
                                type="button"
                                className="btn btn-outline-info"
                            >
                                Criar Nova Categoria
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

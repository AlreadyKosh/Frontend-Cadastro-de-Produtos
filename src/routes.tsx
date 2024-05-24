import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainCategoria from "./pages/categorias/main";
import CriarCategoria from "./pages/categorias/criar";

import MainProdutos from "./pages/produtos/main";
import CriarProduto from "./pages/produtos/criar";
import EditarProduto from "./pages/produtos/editar";
import DeletarProduto from "./pages/produtos/deletar";
import Home from "./pages/Home";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<MainCategoria />} />
            <Route path="/criarCategoria" element={<CriarCategoria />} />
            <Route path="/produtos" element={<MainProdutos />} />
            <Route path="/criarProduto" element={<CriarProduto />} />
            <Route path="/editarProduto/:id" element={<EditarProduto />} />
            <Route path="/deletarProduto/:id" element={<DeletarProduto />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;

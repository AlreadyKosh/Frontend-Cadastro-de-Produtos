import React, { Component, ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./criar.scss";
import { ICategoria } from "../../../types/Categoria";
import { createNewCategoria } from "../../../lib/apiCategoria";

const CriarCategoria: React.FC = () => {
    const [categoria, setCategoria] = useState<ICategoria>({
        id: 0,
        name_class: "",
        description_class: "",
        active_class: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const [erro, setErro] = useState<string | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] =
        useState<boolean>(false);
    const navigate = useNavigate();

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
        const newValue = name === "active_class" ? value === "true" : value;
        setCategoria((prevCategoria) => ({
            ...prevCategoria,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createNewCategoria(
                categoria.name_class,
                categoria.description_class,
                categoria.active_class
            );
            setShowSuccessMessage(true);
            navigate("/categorias");
        } catch (error) {
            console.error("Erro ao salvar a edição na API:", error);
            setErro("Erro ao criar categoria. Por favor, tente novamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Criar Categoria</legend>
                <div className="categoria-insert">
                    <label htmlFor="name_class">Nome</label>
                    <br />
                    <input
                        type="text"
                        id="name_class"
                        name="name_class"
                        placeholder="Nome da Categoria"
                        minLength={1}
                        maxLength={100}
                        required
                        value={categoria?.name_class}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="categoria-insert">
                    <label htmlFor="description_class">Descrição</label>
                    <br />
                    <input
                        type="text"
                        id="description_class"
                        name="description_class"
                        placeholder="Descrição da Categoria"
                        minLength={1}
                        maxLength={100}
                        required
                        value={categoria.description_class}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="categoria-insert">
                    <label>
                        <input
                            type="radio"
                            name="active_class"
                            value="true"
                            checked={categoria.active_class === true}
                            onChange={handleInputChange}
                        />
                        Ativo
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="active_class"
                            value="false"
                            checked={categoria.active_class === false}
                            onChange={handleInputChange}
                        />
                        Inativo
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Cadastrar Categoria
                </button>
            </fieldset>
        </form>
    );
};

export default CriarCategoria;

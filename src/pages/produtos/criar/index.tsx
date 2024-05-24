import React, {
    Component,
    ChangeEvent,
    FormEvent,
    useState,
    useEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import "./criar.scss";
import { IProdutos } from "../../../types/Produto";
import { ICategoria } from "../../../types/Categoria";
import { getCategorias } from "../../../lib/apiCategoria";
import { createNewProduto } from "../../../lib/apiProduto";

const CriarProduto: React.FC = () => {
    const [produto, setProduto] = useState<IProdutos>({
        id: 0,
        name: "",
        price: 0,
        amount: 0,
        description: "",
        categoria_id: -1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const [erro, setErro] = useState<string | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] =
        useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            const payload = await getCategorias();
            console.log(categorias);
            setCategorias(payload.data);
        };
        fetchCategorias();
    }, []);

    const exibeErro = () => {
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    };

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        const newValue = name === "active" ? value === "true" : value;
        setProduto((prevProduto) => ({
            ...prevProduto,
            [name]: name === "categoria_id" ? Number(value) : newValue,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createNewProduto(
                produto.name,
                produto.price,
                produto.amount,
                produto.description,
                produto.active,
                produto.categoria_id
            );
            setShowSuccessMessage(true);
            navigate("/produtos");
        } catch (error) {
            console.error("Erro ao salvar a edição na API:", error);
            setErro("Erro ao criar categoria. Por favor, tente novamente.");
        }
    };

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
                    <label htmlFor="categoria_id">Categoria</label>
                    <br />
                    <select
                        name="categoria_id"
                        value={produto.categoria_id}
                        onChange={handleInputChange}
                        required
                    >
                        <option value={-1} disabled>
                            Selecione uma categoria
                        </option>

                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.name_class}
                            </option>
                        ))}
                    </select>
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

export interface IProdutos {
    id: number;
    name: string;
    price: number;
    amount: number;
    description: string;
    categoria_id: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";

import { Empresa } from "./Empresa";

@Table({
    tableName: "productos_fabricados",
    timestamps: false
})
export class ProductoFabricado extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_producto!: number;

    @ForeignKey(() => Empresa)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    empresa_id!: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    nombre_producto!: string;

    @Column(DataType.TEXT)
    clientes!: string;

    @Column(DataType.DECIMAL(5, 2))
    porcentaje_produccion!: number;

    @BelongsTo(() => Empresa)
    empresa!: Empresa;

}
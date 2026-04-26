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
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    })
    nombre_producto!: string;

    @Column(DataType.TEXT)
    clientes?: string;

    @Column({
        type: DataType.DECIMAL(5, 2),
        validate: {
            min: 0,
            max: 100
        }
    })
    porcentaje_produccion?: string;

    @BelongsTo(() => Empresa)
    empresa!: Empresa;

}
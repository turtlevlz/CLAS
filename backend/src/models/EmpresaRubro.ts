import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey
} from "sequelize-typescript";

import { Empresa } from "./Empresa";
import { Rubro } from "./Rubro";

@Table({
    tableName: "empresa_rubros",
    timestamps: false
})
export class EmpresaRubro extends Model {
    @PrimaryKey
    @ForeignKey(() => Empresa)
    @Column(DataType.INTEGER)
    empresa_id!: number;

    @PrimaryKey
    @ForeignKey(() => Rubro)
    @Column(DataType.INTEGER)
    rubro_id!: number;

}
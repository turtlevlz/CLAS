import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey
} from "sequelize-typescript";

import { Empresa } from "./Empresa";
import { Necesidad } from "./Necesidad";

@Table({
    tableName: "empresa_necesidades",
    timestamps: false
})
export class EmpresaNecesidad extends Model {
    @PrimaryKey
    @ForeignKey(() => Empresa)
    @Column(DataType.INTEGER)
    empresa_id!: number;

    @PrimaryKey
    @ForeignKey(() => Necesidad)
    @Column(DataType.INTEGER)
    necesidad_id!: number;

}
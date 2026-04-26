import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey
} from "sequelize-typescript";

import { Empresa } from "./Empresa";
import { Industria } from "./Industria";
@Table({
    tableName: "empresa_industrias",
    timestamps: false
})
export class EmpresaIndustria extends Model {
    @PrimaryKey
    @ForeignKey(() => Empresa)
    @Column(DataType.INTEGER)
    empresa_id!: number;

    @PrimaryKey
    @ForeignKey(() => Industria)
    @Column(DataType.INTEGER)
    industria_id!: number;

}
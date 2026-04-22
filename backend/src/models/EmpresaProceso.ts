import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey
} from "sequelize-typescript";

import { Empresa } from "./Empresa";
import { Proceso } from "./Proceso";

@Table({
    tableName: "empresa_procesos",
    timestamps: false
})
export class EmpresaProceso extends Model {
    
    @PrimaryKey
    @ForeignKey(() => Empresa)
    @Column(DataType.INTEGER)
    empresa_id!: number;

    @PrimaryKey
    @ForeignKey(() => Proceso)
    @Column(DataType.INTEGER)
    proceso_id!: number;

}
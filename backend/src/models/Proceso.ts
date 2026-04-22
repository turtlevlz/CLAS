import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    BelongsToMany
} from "sequelize-typescript";

import { Empresa } from "./Empresa";
import { EmpresaProceso } from "./EmpresaProceso";

@Table({
    tableName: "procesos",
    timestamps: false
})
export class Proceso extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_proceso!: number;

    @Column({
        type: DataType.STRING(150),
        allowNull: false
    })
    nombre_proceso!: string;

    @BelongsToMany(() => Empresa, () => EmpresaProceso)
    empresas!: Empresa[];

}
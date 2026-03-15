import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany
} from "sequelize-typescript";

import { Empresa } from "./Empresa";

@Table({
    tableName: "membresias",
    timestamps: false
})
export class Membresia extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_membresia!: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    nombre_membresia!: string;

    @HasMany(() => Empresa)
    empresas!: Empresa[];

}
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
    AllowNull
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

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    })
    precio!: number;

    @HasMany(() => Empresa)
    empresas!: Empresa[];

}
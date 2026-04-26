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
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    })
    nombre_membresia!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            notNull: true,
            min: 0
        }
    })
    precio!: string;

    @HasMany(() => Empresa)
    empresas!: Empresa[];

}
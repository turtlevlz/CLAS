import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany
} from "sequelize-typescript";

import { Contacto } from "./Contacto";

@Table({
    tableName: "funciones_contacto",
    timestamps: false
})
export class FuncionContacto extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_funcion!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    })
    nombre_funcion!: string;

    @HasMany(() => Contacto)
    contactos!: Contacto[];

}
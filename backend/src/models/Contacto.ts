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
import { FuncionContacto } from "./FuncionContacto";

@Table({
    tableName: "contactos",
    timestamps: false
})
export class Contacto extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_contacto!: number;

    @ForeignKey(() => Empresa)
    @Column(DataType.INTEGER)
    empresa_id!: number;

    @ForeignKey(() => FuncionContacto)
    @Column(DataType.INTEGER)
    funcion_id?: number;

    @Column(DataType.STRING(150))
    nombre_completo?: string;

    @Column(DataType.STRING(150))
    puesto?: string;

    @Column(DataType.STRING(20))
    telefono_celular?: string;

    @Column(DataType.STRING(150))
    correo?: string;

    @BelongsTo(() => Empresa)
    empresa!: Empresa;

    @BelongsTo(() => FuncionContacto)
    funcion!: FuncionContacto;

}
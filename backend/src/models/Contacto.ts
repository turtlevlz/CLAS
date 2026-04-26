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
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    empresa_id!: number;

    @ForeignKey(() => FuncionContacto)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })  
    funcion_id!: number;

    @Column({
        type: DataType.STRING(150),
        validate: {
            notEmpty: true
        }
    })
    nombre_completo?: string;

    @Column(DataType.STRING(150))
    puesto?: string;

    @Column({
        type: DataType.STRING(20),
        validate: {
            is: /^[0-9+\-\s()]+$/i
        }
    })
    telefono_celular?: string;

    @Column({
        type: DataType.STRING(150),
        validate: {
            isEmail: true
        }
    })
    correo?: string;

    @BelongsTo(() => Empresa)
    empresa!: Empresa;

    @BelongsTo(() => FuncionContacto)
    funcion!: FuncionContacto;

}
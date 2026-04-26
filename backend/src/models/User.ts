import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import { Empresa } from "./Empresa";
import { Role } from "./Role";

@Table({
    tableName: "usuarios",
    timestamps: false
})
export class User extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    id_usuario!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    })
    nombre_usuario!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    })
    contrasena!: string;

    @ForeignKey(() => Empresa)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    empresa_id?: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    rol_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: true,
            notEmpty: true,
            isEmail: true
        }
    })
    correo_electronico!: string;

    //Relaciones
    @BelongsTo(() => Empresa)
    empresa!: Empresa;

    @BelongsTo(() => Role)
    rol!: Role;
}
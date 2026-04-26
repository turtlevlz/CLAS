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
import { EmpresaCertificacion } from "./EmpresaCertificacion";

@Table({
    tableName: "certificaciones",
    timestamps: false
})
export class Certificacion extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_certificacion!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    })
    nombre_certificacion!: string;

    @BelongsToMany(() => Empresa, () => EmpresaCertificacion)
    empresas!: Empresa[];

}
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey
} from "sequelize-typescript";

import { Empresa } from "./Empresa";
import { Certificacion } from "./Certificacion";

@Table({
    tableName: "empresa_certificaciones",
    timestamps: false
})
export class EmpresaCertificacion extends Model {

    @ForeignKey(() => Empresa)
    @Column(DataType.INTEGER)
    empresa_id!: number;

    @ForeignKey(() => Certificacion)
    @Column(DataType.INTEGER)
    certificacion_id!: number;

}
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
    tableName: "tipos_organizacion",
    timestamps: false
})
export class TipoOrganizacion extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_tipo!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    nombre_tipo!: string;

    @HasMany(() => Empresa)
    empresas!: Empresa[];

}
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
import { EmpresaIndustria } from "./EmpresaIndustria";

@Table({
    tableName: "industrias",
    timestamps: false
})
export class Industria extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_industria!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    })
    nombre_industria!: string;

    @BelongsToMany(() => Empresa, () => EmpresaIndustria)
    empresas!: Empresa[];
}
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
import { EmpresaRubro } from "./EmpresaRubro";

@Table({
    tableName: "rubros",
    timestamps: false
})
export class Rubro extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_rubro!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true  
        }
    })
    nombre_rubro!: string;

    @BelongsToMany(() => Empresa, () => EmpresaRubro)
    empresas!: Empresa[];

}
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
import { EmpresaNecesidad } from "./EmpresaNecesidad";

@Table({
    tableName: "necesidades_proveeduria",
    timestamps: false
})
export class Necesidad extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_necesidad!: number;

    @Column({
        type: DataType.STRING(150),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true  
        }
    })
    nombre_necesidad!: string;

    @BelongsToMany(() => Empresa, () => EmpresaNecesidad)
    empresas!: Empresa[];

}
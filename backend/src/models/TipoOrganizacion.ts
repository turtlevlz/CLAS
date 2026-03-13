import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement
} from "sequelize-typescript";

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
        type: DataType.STRING,
        allowNull: false
    })
    nombre_tipo!: string;

}
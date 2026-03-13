import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement
} from "sequelize-typescript";

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
        type: DataType.STRING,
        allowNull: false
    })
    nombre_certificacion!: string;

}
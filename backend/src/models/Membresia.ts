import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement
} from "sequelize-typescript";

@Table({
    tableName: "membresias",
    timestamps: false
})
export class Membresia extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_membresia!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nombre_membresia!: string;

}
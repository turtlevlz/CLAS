import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default
} from "sequelize-typescript";

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
        allowNull: false
    })
    nombre_usuario!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    contrasena!: string;

    @Column({
        type: DataType.INTEGER
    })
    empresa_id!: number;

    @Column({
        type: DataType.INTEGER
    })
    rol_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    correo_electronico!: string;

}
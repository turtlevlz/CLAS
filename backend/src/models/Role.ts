import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement
} from "sequelize-typescript";

@Table({
    tableName: "roles",
    timestamps: false
})
export class Role extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id_rol!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    })
    nombre_rol!: string;

}
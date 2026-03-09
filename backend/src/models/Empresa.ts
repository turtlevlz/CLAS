import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement
} from "sequelize-typescript";

@Table({
    tableName: "empresas",
    timestamps: false
})
export class Empresa extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_empresa!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    nombre!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    datos_generales?: string;

    @Column({
        type: DataType.STRING(150),
        allowNull: true
    })
    correo_electronico?: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true
    })
    contacto?: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true
    })
    nombre_contacto?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    tier_id!: number;

    @Column({
        type: DataType.STRING,
        defaultValue: "default_logo.png",
        allowNull: false
    })
    logo!: string;
}
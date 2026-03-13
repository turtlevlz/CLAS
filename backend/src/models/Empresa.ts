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
    @Column(DataType.INTEGER)
    id_empresa!: number;

    @Column({
        type: DataType.STRING(200),
        allowNull: false
    })
    nombre_comercial!: string;

    @Column(DataType.STRING)
    razon_social?: string;

    @Column(DataType.STRING(13))
    rfc?: string;

    @Column(DataType.STRING)
    correo_electronico?: string;

    @Column(DataType.STRING(20))
    telefono?: string;

    @Column(DataType.STRING)
    sitio_web?: string;

    @Column(DataType.INTEGER)
    membresia_id?: number;

    @Column(DataType.INTEGER)
    tipo_organizacion_id?: number;

    @Column(DataType.STRING)
    ciudad?: string;

    @Column(DataType.TEXT)
    domicilio_completo?: string;

    @Column(DataType.STRING)
    giro?: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    fabrica_para_automotriz?: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    activo?: boolean;

    @Column({
        type: DataType.DATE
    })
    fecha_registro?: Date;

    @Column({
        type: DataType.STRING,
        defaultValue: "default_logo.png"
    })
    logo?: string;

}
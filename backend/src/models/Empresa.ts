import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    HasMany,
    BelongsToMany
} from "sequelize-typescript";

import { Membresia } from "./Membresia";
import { TipoOrganizacion } from "./TipoOrganizacion";
import { Contacto } from "./Contacto";
import { Certificacion } from "./Certificacion";
import { EmpresaCertificacion } from "./EmpresaCertificacion";
import { Rubro } from "./Rubro";
import { EmpresaRubro } from "./EmpresaRubro";

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

    @ForeignKey(() => Membresia)
    @Column(DataType.INTEGER)
    membresia_id?: number;

    @ForeignKey(() => TipoOrganizacion)
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

    //Relaciones

    @BelongsTo(() => Membresia)
    membresia!: Membresia;

    @BelongsTo(() => TipoOrganizacion)
    tipoOrganizacion!: TipoOrganizacion;

    @HasMany(() => Contacto)
    contactos!: Contacto[];

    @BelongsToMany(() => Certificacion, () => EmpresaCertificacion)
    certificaciones!: Certificacion[];

    @BelongsToMany(() => Rubro, () => EmpresaRubro)
    rubros!: Rubro[];
}
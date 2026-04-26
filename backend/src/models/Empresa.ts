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
import { Proceso } from "./Proceso";
import { EmpresaProceso } from "./EmpresaProceso";
import { ProductoFabricado } from "./ProductoFabricado";
import { User } from "./User";
import { Industria } from "./Industria";
import { EmpresaIndustria } from "./EmpresaIndustria";
import { Necesidad } from "./Necesidad";
import { EmpresaNecesidad } from "./EmpresaNecesidad";

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
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    })
    nombre_comercial!: string;

    @Column(DataType.STRING)
    razon_social?: string;

    @Column({
        type: DataType.STRING(13),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
            len: [12, 13]
        }
    })
    rfc!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            isEmail: true
        }
    })
    correo_electronico!: string;

    @Column({
        type: DataType.STRING(20),
        validate: {
            is: /^[0-9+\-\s()]+$/i
        }
    })
    telefono?: string;

    @Column({
        type: DataType.STRING,
        validate: {
            isUrl: true
        }
    })
    sitio_web?: string;

    @ForeignKey(() => Membresia)
    @Column(DataType.INTEGER)
    membresia_id!: number;

    @ForeignKey(() => TipoOrganizacion)
    @Column(DataType.INTEGER)
    tipo_organizacion_id!: number;

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

    @Column(DataType.TEXT)
    descripcion?: string;

    @Column(DataType.INTEGER)
    anio_fundacion?: number;

    @Column(DataType.STRING(50))
    rango_empleados?: string;

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

    @BelongsToMany(() => Proceso, () => EmpresaProceso)
    procesos!: Proceso[];

    @HasMany(() => ProductoFabricado)
    productosFabricados!: ProductoFabricado[];

    @HasMany(() => User)
    usuarios!: User[];

    @BelongsToMany(() => Industria, () => EmpresaIndustria)
    industrias!: Industria[];

    @BelongsToMany(() => Necesidad, () => EmpresaNecesidad)
    necesidades!: Necesidad[];
}
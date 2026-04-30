declare module "types" {

    // catalogos simples

    export interface Certificacion {
        id_certificacion     : number;
        nombre_certificacion : string;
    }

    export interface NewCertificacionInput {
        nombre_certificacion : string;
    }

    export interface FuncionContacto {
        id_funcion     : number;
        nombre_funcion : string;
    }

    export interface NewFuncionContactoInput {
        nombre_funcion : string;
    }

    export interface Membresia {
        id_membresia     : number;
        nombre_membresia : string;
        precio           : string;
    }

    export interface TipoOrganizacion {
        id_tipo     : number;
        nombre_tipo : string;
    }

    export interface Rubro {
        id_rubro     : number;
        nombre_rubro : string;
    }

    export interface Industria {
        id_industria     : number;
        nombre_industria : string;
    }

    export interface Necesidad {
        id_necesidad     : number;
        nombre_necesidad : string;
    }

    export interface Proceso {
        id_proceso     : number;
        nombre_proceso : string;
    }

    // entidades principales

    export interface Empresa {
        id_empresa               : number;
        nombre_comercial         : string;
        razon_social?            : string;
        rfc                      : string;
        correo_electronico       : string;
        telefono?                : string;
        sitio_web?               : string;
        membresia_id             : number;
        tipo_organizacion_id     : number;
        ciudad?                  : string;
        domicilio_completo?      : string;
        giro?                    : string;
        fabrica_para_automotriz? : boolean;
        activo?                  : boolean;
        fecha_registro?          : string;
        logo?                    : string;
        descripcion?             : string;
        anio_fundacion?          : number;
        rango_empleados?         : string;

        membresia?        : Membresia;
        tipoOrganizacion? : TipoOrganizacion;
        contactos?        : Contacto[];
        certificaciones?  : Certificacion[];
        rubros?           : Rubro[];
        procesos?         : Proceso[];
        industrias?       : Industria[];
        necesidades?      : Necesidad[];
    }

    export interface NewEmpresaInput {
        nombre_comercial         : string;
        rfc                      : string;
        correo_electronico       : string;
        membresia_id             : number;
        tipo_organizacion_id     : number;
        razon_social?            : string;
        telefono?                : string;
        sitio_web?               : string;
        ciudad?                  : string;
        domicilio_completo?      : string;
        giro?                    : string;
        fabrica_para_automotriz? : boolean;
        descripcion?             : string;
        anio_fundacion?          : number;
        rango_empleados?         : string;
    }

    export interface Contacto {
        id_contacto       : number;
        empresa_id        : number;
        funcion_id        : number;
        nombre_completo?  : string;
        puesto?           : string;
        telefono_celular? : string;
        correo?           : string;

        empresa? : Empresa;
        funcion? : FuncionContacto;
    }

    export interface NewContactoInput {
        empresa_id        : number;
        funcion_id        : number;
        nombre_completo?  : string;
        puesto?           : string;
        telefono_celular? : string;
        correo?           : string;
    }

    // pivotes M:N

    export interface EmpresaCertificacion {
        empresa_id       : number;
        certificacion_id : number;
    }

    export interface EmpresaIndustria {
        empresa_id   : number;
        industria_id : number;
    }

    export interface EmpresaNecesidad {
        empresa_id   : number;
        necesidad_id : number;
    }

    export interface EmpresaProceso {
        empresa_id : number;
        proceso_id : number;
    }

    export interface Industria {
        id_industria     : number;
        nombre_industria : string;
    }

    export interface NewIndustriaInput {
        nombre_industria : string;
    }

    export interface Membresia {
        id_membresia     : number;
        nombre_membresia : string;
        precio           : string;
    }

    export interface NewMembresiaInput {
        nombre_membresia : string;
        precio           : number | string;
    }

    export interface Necesidad {
        id_necesidad     : number;
        nombre_necesidad : string;
    }

    export interface NewNecesidadInput {
        nombre_necesidad : string;
    }

    export interface Proceso {
        id_proceso     : number;
        nombre_proceso : string;
    }

    export interface NewProcesoInput {
        nombre_proceso : string;
    }

    export interface ProductoFabricado {
        id_producto            : number;
        empresa_id             : number;
        nombre_producto        : string;
        clientes?              : string;
        porcentaje_produccion? : string;
    }

    export interface NewProductoFabricadoInput {
        empresa_id?            : number;
        nombre_producto        : string;
        clientes?              : string;
        porcentaje_produccion? : number | string;
    }

    export interface Role {
        id_rol     : number;
        nombre_rol : string;
    }

    export interface NewRoleInput {
        nombre_rol : string;
    }

    export interface Rubro {
        id_rubro     : number;
        nombre_rubro : string;
    }

    export interface NewRubroInput {
        nombre_rubro : string;
    }

    export interface TipoOrganizacion {
        id_tipo     : number;
        nombre_tipo : string;
    }

    export interface NewTipoOrganizacionInput {
        nombre_tipo : string;
    }

    export interface User {
        id_usuario         : string;
        nombre_usuario     : string;
        correo_electronico : string;
        empresa_id         : number | null;
        rol_id             : number;
    }

    export interface NewUserInput {
        nombre_usuario     : string;
        contrasena         : string;
        correo_electronico : string;
        rol_id             : number;
        empresa_id         : number | null;
    }

    export interface UpdateUserInput {
        nombre_usuario?     : string;
        correo_electronico? : string;
        contrasena?         : string;
    }
}

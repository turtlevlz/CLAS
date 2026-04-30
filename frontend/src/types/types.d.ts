declare module "types" {

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

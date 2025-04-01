export interface DeviceNoticeData{
    fecha_emision:string;
    cliente:string;
    ruc:string;
    direccion:string;
    contacto:string;
    moneda:string;
    tipo_cambio_moneda:number;
    condicion_pago:string;
    estado:string;
    observaciones:string;
    importe?: number;
    id_usuario_creador?:number
}

export interface DeviceNoticeDetailData{
    id?:string,
    tipo_concepto: string,
    descripcion_concepto: string,
    cantidad: number,
    precio_unitario: number,
    importe?: number,
    centro_costo?: string,
    fecha_servicio_desde?: string,
    fecha_servicio_hasta?: string,
    observaciones?: string,
    unidad_medida?:string,
    numero_solicitud?:string
}

export interface DebitNoticeUpdateData{
    observaciones?: string,
    estado?:string,
    id_cliente?:number
}

export interface ClientDataResponse{
    id: number,
    ruc: string,
    nombre: string,
    direccion: string,
    contacto: string
}
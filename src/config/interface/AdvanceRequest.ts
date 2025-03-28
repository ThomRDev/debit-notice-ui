export interface AdvanceRequestData{
    id:string;
    numero_solicitud:string;
    fecha_solicitud:string;
    solicitante:string;
    importe:number;
    moneda:string;
    estado:string;
}

export interface ApiResponse{
    data:AdvanceRequestData[];
    page_size:number;
    total_count:number;
    current_page:number;
}
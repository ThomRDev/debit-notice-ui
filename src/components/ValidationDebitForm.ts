import * as Yup from 'yup';

export const deviceNoticeSchema = Yup.object().shape({
  fecha_emision: Yup.date()
    .required('Fecha de emisión es requerida')
    .max(new Date(), 'La fecha no puede ser futura'),
  
  cliente: Yup.number()
    .required('Seleccionar cliente')
    .positive('Seleccione un cliente válido'),
    
  moneda: Yup.string()
    .required('Seleccione una moneda')
    .oneOf(['PEN', 'USD'], 'Moneda inválida'),
    
    tipo_cambio: Yup.number()
    .when('moneda', {
      is: (value: string) => value === 'PEN',
      then: () => Yup.number()
        .required('Ingrese el tipo de cambio para soles')
        .min(0.1, 'Mínimo 0.1')
        .max(10, 'Máximo 10'),
      otherwise: () => Yup.number()
        .notRequired()
    }),
    
  condicion_pago: Yup.string()
    .required('Condición de pago es requerida')
    .oneOf(['CONTADO', '30 DÍAS', '60 DÍAS'], 'Condición inválida'),
    
  estado: Yup.string()
    .oneOf(['BORRADOR', 'PENDIENTE', 'MIGRADO', 'ANULADO'], 'Estado inválido'),
    
  observaciones: Yup.string()
    .max(500, 'Máximo 500 caracteres')
    .nullable()
});

export const deviceNoticeDetailSchema = Yup.object().shape({
  tipo_concepto: Yup.string().required('El tipo de concepto es obligatorio'),
  desc_concepto: Yup.string().required('La descripción del concepto es obligatoria'),
  cantidad: Yup.number()
    .typeError('Debe ser un número')
    .min(1, 'La cantidad debe ser mayor a 0')
    .required('La cantidad es obligatoria'),
  precio_uni: Yup.number()
    .typeError('Debe ser un número')
    .min(0, 'El precio unitario no puede ser negativo')
    .required('El precio unitario es obligatorio'),
  importe: Yup.number()
    .typeError('Debe ser un número')
    .min(0, 'El importe no puede ser negativo')
    .required('El importe es obligatorio'),
  centro_costo: Yup.string().required('El centro de costo es obligatorio'),
  fecha_desde: Yup.date()
    .required('La fecha de inicio es obligatoria')
    .max(Yup.ref('fecha_hasta'), 'La fecha desde no puede ser mayor que la fecha hasta'),
  fecha_hasta: Yup.date()
    .required('La fecha de fin es obligatoria')
    .min(Yup.ref('fecha_desde'), 'La fecha hasta no puede ser menor que la fecha desde'),
  observaciones: Yup.string().max(500, 'Las observaciones no pueden superar los 500 caracteres'),
});
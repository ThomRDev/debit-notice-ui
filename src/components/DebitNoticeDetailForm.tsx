import { useFormik } from "formik";
import { deviceNoticeDetailSchema } from "./ValidationDebitForm";
import { useAdvanceRequestSelected } from "../store/useAdvanceRequestSelected.store";

export const DebitNoticeDetailForm = ()=>{
    const {  addDetail,selectedAdvances, details } = useAdvanceRequestSelected();

    const formik = useFormik({
        initialValues: {
          tipo_concepto: '',
          descripcion_concepto: '',
          cantidad: 0,
          precio_unitario: 0,
          importe: 0,
          centro_costo: '',
          fecha_servicio_desde: new Date().toISOString().split('T')[0],
          fecha_servicio_hasta: new Date().toISOString().split('T')[0],
          observaciones: '',
          unidad_medida:'UND'
        },
        validationSchema: deviceNoticeDetailSchema,
        onSubmit: async (values) => {
            addDetail(values);
            formik.resetForm();
            console.log('detail form',details)
        }
      });

      const handleQuantityPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e); 
        const getNumericValue = (value: string | number): number => {
            return typeof value === 'string' ? parseFloat(value) || 0 : value;
          };
          
          const cantidad = getNumericValue(
            e.target.name === 'cantidad' ? e.target.value : formik.values.cantidad
          );
        
          const precio = getNumericValue(
            e.target.name === 'precio_unitario' ? e.target.value : formik.values.precio_unitario
          );
        
          const newImporte = cantidad * precio;
        
        formik.setFieldValue('importe', newImporte);
      };
    
    return(
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-4 gap-x-15">
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Tipo de Concepto*</label>
                        <select
                        name="tipo_concepto"
                        onChange={formik.handleChange}
                        value={formik.values.tipo_concepto}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border rounded border-gray-400"
                        >
                        <option value="">Seleccione un tipo</option>
                        <option value="SERVICIO">SERVICIO</option>
                        <option value="OTROS">OTROS</option>
                        </select>

                        {formik.errors.tipo_concepto && (
                        <p className="text-red-500 text-sm">{formik.errors.tipo_concepto}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Descripción del concepto*</label>
                        <input
                        type="text"
                        name="descripcion_concepto"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.descripcion_concepto}
                        className="w-full p-2 border rounded border-gray-400"
                        />
                        {formik.errors.descripcion_concepto && (
                        <p className="text-red-500 text-sm">{formik.errors.descripcion_concepto}</p>
                        )}
                        </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Cantidad</label>
                        <input
                        type="number"
                        step="1"
                        name="cantidad"
                        onChange={handleQuantityPriceChange}
                        value={formik.values.cantidad}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                        {formik.errors.cantidad && (
                        <p className="text-red-500 text-sm">{formik.errors.cantidad}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Precio Unitario</label>
                        <input
                        type="number"
                        name="precio_unitario"
                        value={formik.values.precio_unitario}
                        onBlur={formik.handleBlur}
                        onChange={handleQuantityPriceChange}
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                        {formik.errors.precio_unitario && (
                        <p className="text-red-500 text-sm">{formik.errors.precio_unitario}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600" >Importe</label>
                        <input
                        type="text"
                        name="importe"
                        value={formik.values.importe.toFixed(2)}
                        readOnly 
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Centro de costo*</label>
                        <select
                        name="centro_costo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.centro_costo}
                        className="w-full p-2 border rounded border-gray-400"
                        >
                        <option value="">Seleccione un centro de costo</option>
                        <option value="Rrhh">RRHH</option>
                        <option value="Producción">Producción</option>
                        <option value="Ti">TI - Infraestructura</option>
                        <option value="Administración">Administración</option>
                        </select>

                        
                        {formik.errors.centro_costo && (
                        <p className="text-red-500 text-sm">{formik.errors.centro_costo}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Fecha Desde*</label>
                        <input
                        type="date"
                        name="fecha_servicio_desde"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fecha_servicio_desde}
                        className="w-full p-2 border rounded border-gray-400"
                        />
                        {formik.errors.fecha_servicio_desde && (
                        <p className="text-red-500 text-sm">{formik.errors.fecha_servicio_desde}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Fecha Hasta*</label>
                        <input
                        type="date"
                        name="fecha_servicio_hasta"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fecha_servicio_hasta}
                        className="w-full p-2 border rounded border-gray-400"
                        />
                        {formik.errors.fecha_servicio_hasta && (
                        <p className="text-red-500 text-sm">{formik.errors.fecha_servicio_hasta}</p>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block mb-1 pt-3 text-sm text-gray-600">Observaciones de línea</label>
                    <textarea
                        name="observaciones"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.observaciones}
                        rows={3}
                        className="w-full p-2 border rounded border-gray-400"
                        maxLength={500}
                        />
                        {formik.errors.observaciones && (
                        <p className="text-red-500 text-sm">{formik.errors.observaciones}</p>
                    )}
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                    Agregar Detalle
                    </button>
                </div>
            </form>

            <div className="bg-white shadow-md rounded-lg overflow-hidden pt-10">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            N°
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo de Concepto
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Código
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descripción
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cant.
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            P. Unit.
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Importe
                        </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        
                    {selectedAdvances.map((advance, index) => (
                        <tr key={advance.id} className="hover:bg-gray-50">
                        <td className="p-3 text-sm font-medium text-gray-900">
                            {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                            ANTICIPO
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                            ANT
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                            Anticipo {advance.numero_solicitud} - {advance.solicitante} - {advance.motivo}
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                            1
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                            {advance.importe.toFixed(2)}
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                            {advance.importe.toFixed(2)}
                        </td>
                        </tr>
                    ))}

                    {details.map((detail, index) => (
                            <tr key={detail.id} className="hover:bg-gray-50">
                                <td className="p-3 text-sm font-medium text-gray-900">{selectedAdvances.length + index + 1}</td>
                                <td className="p-3 text-sm text-gray-500">{detail.tipo_concepto}</td>
                                <td className="p-3 text-sm text-gray-500">{detail.tipo_concepto== 'SERVICIO'? 'SERV' : 'OTRO'}</td>
                                <td className="p-3 text-sm text-gray-500">{detail.descripcion_concepto}</td>
                                <td className="p-3 text-sm text-gray-500">{detail.cantidad}</td>
                                <td className="p-3 text-sm text-gray-500">{detail.precio_unitario.toFixed(2)}</td>
                                <td className="p-3 text-sm text-gray-500">{detail.importe?.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
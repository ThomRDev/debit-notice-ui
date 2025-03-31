import { useFormik } from "formik";
import { deviceNoticeDetailSchema } from "./ValidationDebitForm";
import { useAdvanceRequestSelected } from "../store/useAdvanceRequestSelected.store";

export const DebitNoticeDetailForm = ()=>{
    const { selectedAdvances } = useAdvanceRequestSelected();
    const formik = useFormik({
        initialValues: {
          tipo_concepto: '',
          desc_concepto: '',
          cantidad: '',
          precio_uni: '',
          importe: '',
          centro_costo: '',
          fecha_desde: new Date().toISOString().split('T')[0],
          fecha_hasta: new Date().toISOString().split('T')[0],
          observaciones: ''
        },
        validationSchema: deviceNoticeDetailSchema,
        onSubmit: (values) => {
          console.log('Formulario enviado:', values);
        }
      });
    return(
        <>
            <form>
                <div className="grid grid-cols-2 gap-4 gap-x-15">
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Tipo de Concepto*</label>
                        <input
                        type="date"
                        name="tipo_concepto"
                        onChange={formik.handleChange}
                        value={formik.values.tipo_concepto}
                        className="w-full p-2 border rounded border-gray-400"
                        />
                        {formik.errors.tipo_concepto && (
                        <p className="text-red-500 text-sm">{formik.errors.tipo_concepto}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Descripción del concepto*</label>
                        <input
                        type="text"
                        name="desc_concepto"
                        value={formik.values.desc_concepto}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                        </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Cantidad</label>
                        <input
                        type="number"
                        name="cantidad"
                        value={formik.values.cantidad}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Precio Unitario</label>
                        <input
                        type="text"
                        name="precio_uni"
                        value={formik.values.precio_uni}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600" >Importe</label>
                        <input
                        type="text"
                        name="importe"
                        value={formik.values.importe}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Centro de costo*</label>
                        <select
                        name="centro_costo"
                        onChange={formik.handleChange}
                        value={formik.values.centro_costo}
                        className="w-full p-2 border rounded border-gray-400"
                        >
                        <option value="RRHH">RRHH</option>
                        <option value="VENTAS">VENTAS</option>
                        <option value="SISTEMAS">SISTEMAS</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Fecha Desde*</label>
                        <input
                        type="date"
                        name="fecha_desde"
                        onChange={formik.handleChange}
                        value={formik.values.fecha_desde}
                        className="w-full p-2 border rounded border-gray-400"
                        />
                        {formik.errors.fecha_desde && (
                        <p className="text-red-500 text-sm">{formik.errors.fecha_desde}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Fecha Hasta*</label>
                        <input
                        type="date"
                        name="fecha_hasta"
                        onChange={formik.handleChange}
                        value={formik.values.fecha_hasta}
                        className="w-full p-2 border rounded border-gray-400"
                        />
                        {formik.errors.fecha_hasta && (
                        <p className="text-red-500 text-sm">{formik.errors.fecha_hasta}</p>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block mb-1 pt-3 text-sm text-gray-600">Observaciones de línea</label>
                    <textarea
                        name="observaciones"
                        onChange={formik.handleChange}
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
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-blue-700"
                    >
                    Siguiente
                    </button>
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
                            Anticipo
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
                    </tbody>
                </table>
            </div>
        </>
    )
}
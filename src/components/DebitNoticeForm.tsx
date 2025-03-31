import { useFormik } from "formik";
import { deviceNoticeSchema } from "./ValidationDebitForm";
import { Modal } from "./Modal";
import useModalStore from "../store/useModalStore.store";
export const DebitNoticeForm = ()=>{
    const { openModal } = useModalStore();
    const formik = useFormik({
        initialValues: {
          fecha_emision: new Date().toISOString().split('T')[0],
          cliente: '',
          ruc: '',
          direccion: '',
          contacto: '',
          moneda: 'PEN',
          tipo_cambio: 3.75,
          condicion_pago: '30 DÍAS',
          estado: 'BORRADOR',
          observaciones: ''
        },
        validationSchema: deviceNoticeSchema,
        onSubmit: (values) => {
          console.log('Formulario enviado:', values);
        }
      });

      const isFormikComplete = ()=>{
        return Object.keys(formik.errors).length === 0 &&
        formik.values.cliente !=='' && formik.values.fecha_emision !== ''
      }

      const handleChange = ()=>{
        openModal('draft-notification', (close) => (
            <div className="p-6 bg-white rounded-lg max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Aviso guardado</h3>
                <button 
                  onClick={close}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <p className="mb-6">El aviso se ha guardado como borrador.</p>
              <div className="flex justify-end">
                <button
                  onClick={close}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Aceptar
                </button>
              </div>
            </div>
          ));
      }


      
    return(
        <>
            <form onChange={handleChange}>
                <div className="grid grid-cols-2 gap-4 gap-x-15">
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Fecha de Emisión*</label>
                        <input
                        type="date"
                        name="fecha_emision"
                        onChange={formik.handleChange}
                        value={formik.values.fecha_emision}
                        className="w-full p-2 border rounded border-gray-400"
                        />
                        {formik.errors.fecha_emision && (
                        <p className="text-red-500 text-sm">{formik.errors.fecha_emision}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Moneda*</label>
                        <select
                            name="moneda"
                            value={formik.values.moneda}
                            className="w-full p-2 border rounded border-gray-400"
                            onChange={formik.handleChange}
                        >
                            <option value="PEN">SOL (PEN)</option>
                            <option value="USD">Dólares (USD)</option>
                        </select>
                        </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Cliente*</label>
                        <select
                        name="cliente"
                        value={formik.values.cliente}
                        className="w-full p-2 border rounded border-gray-400"
                        >
                        <option value="">Seleccione un cliente</option>
                        </select>
                        {formik.errors.cliente && (
                        <p className="text-red-500 text-sm">{formik.errors.cliente}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">
                            {formik.values.moneda === 'PEN' ? 'Tipo de Cambio*' : 'Tipo de Cambio'}
                        </label>
                        <input
                            type="number"
                            name="tipo_cambio"
                            step="0.01"
                            onChange={formik.handleChange}
                            value={formik.values.tipo_cambio}
                            readOnly={formik.values.moneda === 'USD'}
                            className={`w-full p-2 border rounded border-gray-400 ${
                            formik.values.moneda === 'USD' ? 'bg-gray-100 cursor-not-allowed ' : ''
                            }`}
                        />
                        {formik.errors.tipo_cambio && (
                            <p className="text-red-500 text-sm">{formik.errors.tipo_cambio}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">RUC</label>
                        <input
                        type="text"
                        name="ruc"
                        value={formik.values.ruc}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Importe Total</label>
                        <input
                        type="text"
                        name="importe"
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Dirección</label>
                        <input
                        type="text"
                        name="direccion"
                        value={formik.values.direccion}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Condición de Pago*</label>
                        <select
                        name="condicion_pago"
                        onChange={formik.handleChange}
                        value={formik.values.condicion_pago}
                        className="w-full p-2 border rounded border-gray-400"
                        >
                        <option value="CONTADO">CONTADO</option>
                        <option value="30 DÍAS">30 DÍAS</option>
                        <option value="60 DÍAS">60 DÍAS</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Contacto</label>
                        <input
                        type="text"
                        name="contacto"
                        value={formik.values.contacto}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Estado del Aviso*</label>
                        <div className="p-2 border rounded-sm border-gray-400">BORRADOR</div>
                    </div>
                </div>
                <div>
                    <label className="block mb-1 pt-3 text-sm text-gray-600">Observaciones Generales</label>
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
                    type="button"
                    onClick={() => formik.resetForm()}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                    Cancelar
                    </button>
                    <button
                    type="submit"
                    className={`px-4 py-2 text-white rounded ${
                        isFormikComplete() ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                    {isFormikComplete() ? 'Guardar Aviso' : 'Guardar Borrador'}
                    </button>
                </div>
            </form>
            <Modal></Modal> 
        </>
    )
}
import { useFormik } from "formik";
import { deviceNoticeSchema } from "./ValidationDebitForm";
import { useAdvanceRequestSelected } from "../store/useAdvanceRequestSelected.store";
import { DebitNoticeApi } from "../config/api";
import { DeviceNoticeDetailData } from "../config/interface/DeviceNotice";
import { ClientApi } from "../config/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useDebitNoticeStore } from "../store/useDebitNoticeStore.store";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useUserManagementStore from "../store/useUserManagement.store";
import { useNavigate } from "react-router";
export const DebitNoticeForm = () => {
  const { selectedAdvances, details, clear } = useAdvanceRequestSelected();
  const { formData, updateFormData, resetFormData } = useDebitNoticeStore();
  const { id } = useUserManagementStore();
  const navigate = useNavigate();

  console.log("form", details);
  const { data: clientsData } = useQuery({
    queryKey: ["clients"],
    queryFn: () => ClientApi.getAll(),
  });

  const clients = Array.isArray(clientsData) ? clientsData : [];

  const importeTotal = useMemo(() => {
    let totalAnticipo = 0;
    let totalDetails = 0;
    selectedAdvances.forEach((anticipo) => {
      totalAnticipo += anticipo.importe;
    });
    details.forEach((detalle) => {
      totalDetails += detalle.importe!;
    });
    return totalAnticipo + totalDetails;
  }, [selectedAdvances, details]);

  const formik = useFormik({
    initialValues: formData,
    validationSchema: deviceNoticeSchema,
    onSubmit: async (values) => {
      console.log("Entrando");
      const bodyDebit = {
        fecha_emision: values.fecha_emision,
        cliente: values.cliente,
        ruc: values.ruc,
        direccion: values.direccion,
        contacto: values.contacto,
        moneda: values.moneda,
        tipo_cambio_moneda: values.tipo_cambio_moneda,
        condicion_pago: values.condicion_pago,
        estado: values.estado,
        observaciones: values.observaciones,
        id_usuario_creador: Number(id),
        importe: importeTotal,
      };
      const mappedAdvances: DeviceNoticeDetailData[] = selectedAdvances.map(
        (advance) => ({
          tipo_concepto: "ANTICIPO",
          descripcion_concepto: advance.motivo || "",
          cantidad: 1,
          precio_unitario: advance.importe || 0,
          importe: 1 * (advance.importe || 0),
          numero_solicitud_anticipo: advance.id,
        })
      );
      const bodyDebitDetail: DeviceNoticeDetailData[] = [
        ...mappedAdvances,
        ...details,
      ];
      console.log("Enviando cosas", bodyDebit);
      try {
        toast.promise(DebitNoticeApi.create(bodyDebit, bodyDebitDetail), {
          loading: "Enviado datos al servidor...",
          success: () => {
            resetFormData();
            formik.resetForm();
            clear();
            console.log("LOGIN");
            return "Aviso Débito Creado";
          },
          error: (err) =>
            err.response?.data?.message || "Error al cambiar estado",
        });
      } catch (error) {
        console.error("Error al enviar aviso de débito:", error);
      }
      navigate("/gestion-comercial/avisos-debito")
    },
  });

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClientId = e.target.value;
    formik.setFieldValue("cliente", selectedClientId);
    if (!clients) return;

    const selectedClient = clients.find(
      (client) => client?.id?.toString() === selectedClientId
    );

    if (selectedClient) {
      formik.setFieldValue("ruc", selectedClient.ruc || "");
      formik.setFieldValue("direccion", selectedClient.direccion || "");
      formik.setFieldValue("contacto", selectedClient.contacto || "");
    }
  };

  const [prevFormikValues, setPrevFormikValues] = useState(formik.values);
  useEffect(() => {
    if (JSON.stringify(prevFormikValues) !== JSON.stringify(formik.values)) {
      updateFormData(formik.values);
      setPrevFormikValues(formik.values);
    }
  }, [formik.values, updateFormData, prevFormikValues]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-4 gap-x-15">
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Fecha de Emisión*
            </label>
            <input
              type="date"
              name="fecha_emision"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fecha_emision}
              className="w-full p-2 border rounded border-gray-400"
              max={new Date().toISOString().split("T")[0]}
            />
            {formik.errors.fecha_emision && (
              <p className="text-red-500 text-sm">
                {formik.errors.fecha_emision}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Moneda*</label>
            <select
              name="moneda"
              value={formik.values.moneda}
              className="w-full p-2 border rounded border-gray-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Seleccione una moneda</option>
              <option value="PEN">SOL (PEN)</option>
              <option value="USD">Dólares (USD)</option>
            </select>

            {formik.errors.moneda && (
              <p className="text-red-500 text-sm">
                {formik.errors.moneda}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Cliente*</label>
            <select
              name="cliente"
              value={formik.values.cliente}
              onChange={handleClientChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded border-gray-400"
            >
              <option value="">Seleccione un cliente</option>
              {clients?.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nombre}
                </option>
              ))}
            </select>
            {formik.errors.cliente && (
              <p className="text-red-500 text-sm">{formik.errors.cliente}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              {formik.values.moneda === "PEN"
                ? "Tipo de Cambio*"
                : "Tipo de Cambio"}
            </label>
            <input
              type="number"
              name="tipo_cambio_moneda"
              step="0.01"
              onChange={formik.handleChange}
              value={formik.values.tipo_cambio_moneda}
              onBlur={formik.handleBlur}
              readOnly={formik.values.moneda === "USD"}
              className={`w-full p-2 border rounded border-gray-400 ${
                formik.values.moneda === "USD"
                  ? "bg-gray-100 cursor-not-allowed "
                  : ""
              }`}
            />
            {formik.errors.tipo_cambio_moneda && (
              <p className="text-red-500 text-sm">
                {formik.errors.tipo_cambio_moneda}
              </p>
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
            <label className="block mb-1 text-sm text-gray-600">
              Importe Total
            </label>
            <input
              type="text"
              name="importe"
              value={importeTotal.toFixed(2)}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 border-gray-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={formik.values.direccion}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 border-gray-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Condición de Pago*
            </label>
            <select
              name="condicion_pago"
              onChange={formik.handleChange}
              value={formik.values.condicion_pago}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded border-gray-400"
            >
              <option value="">Seleccione una condición de pago</option>
              <option value="CONTADO">CONTADO</option>
              <option value="30 DÍAS">30 DÍAS</option>
              <option value="60 DÍAS">60 DÍAS</option>
            </select>

            {formik.errors.condicion_pago && (
              <p className="text-red-500 text-sm">
                {formik.errors.condicion_pago}
              </p>
            )}
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
            <label className="block mb-1 text-sm text-gray-600">
              Estado del Aviso*
            </label>
            <select
              name="estado"
              value={formik.values.estado}
              className="w-full p-2 border rounded border-gray-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Seleccione un estado</option>
              <option value="BORRADOR">BORRADOR</option>
              <option value="PENDIENTE">PENDIENTE</option>
            </select>

            {formik.errors.estado && (
              <p className="text-red-500 text-sm">
                {formik.errors.estado}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="block mb-1 pt-3 text-sm text-gray-600">
            Observaciones Generales
          </label>
          <textarea
            name="observaciones"
            onChange={formik.handleChange}
            value={formik.values.observaciones}
            onBlur={formik.handleBlur}
            rows={3}
            className="w-full p-2 border rounded border-gray-400"
            maxLength={500}
          />
          {formik.errors.observaciones && (
            <p className="text-red-500 text-sm">
              {formik.errors.observaciones}
            </p>
          )}
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              clear();
              useDebitNoticeStore.getState().resetFormData();
            }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded ${
              formik.values.estado == "PENDIENTE"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {formik.values.estado == "PENDIENTE"
              ? "Guardar Aviso"
              : "Guardar Borrador"}
          </button>
        </div>
      </form>
    </>
  );
};

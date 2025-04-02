/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowLeftIcon,
  FolderArrowDownIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import capitalize from "capitalize";
import { useNavigate } from "react-router";
import { getStatusColor } from "../utils/color";
import {DebitNotice} from "./TableDebit";
import { useState } from "react";
import toast from "react-hot-toast";
import { useChangeStateDebitNote } from "../hooks/useChangeStateDebitNote";
import useUserManagementStore from "../store/useUserManagement.store";
import useModalStore from "../store/useModalStore.store";
import AnularAvisosSAP from "./AnularAvisosSAP";
interface Props {
  data: any;
}

export const ViewDetailDebit = ({ data }: Props) => {
  const navigate = useNavigate();
  console.log("🚀 ~ ViewDetailDebit ~ data:", data);

  const [selectedNotices, setSelectedNotices] = useState<DebitNotice[]>([]);
  const { mutateAsync: changeStateDebitNote, isPending } = useChangeStateDebitNote();
  const { id } = useUserManagementStore();
  const { openModal } = useModalStore();
      
  const onAnular = (avisos: string[], motivo: string, close: () => void) => {
    const changeStateDebitNotePromise = changeStateDebitNote({
      usuario_modificador: id,
      estado_final: "ANULADO",
      avisos,
      motivo,
    });

    toast.promise(changeStateDebitNotePromise, {
      loading: "Cambiando estado...",
      success: () => {
        setSelectedNotices([]);
        close();
        
        return "Estado cambiado con éxito";
      },
      error: (err) => err.response?.data?.message || "Error al cambiar estado",
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => {
              navigate("/gestion-comercial/avisos-debito");
            }}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold">
            N° {data.aviso_debito.numero_aviso}
            {data.aviso_debito.numero_sap &&
              " | N° SAP:" + data.aviso_debito.numero_sap}
          </h2>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
            data.aviso_debito.estado
          )}`}
        >
          {capitalize(data.aviso_debito.estado)}
        </span>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg px-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">AVISO DE DÉBITO</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="mb-2">
                <span className="font-semibold">Fecha de emisión:</span>{" "}
                {new Intl.DateTimeFormat("es-PE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(data.aviso_debito.fecha_emision))}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Usuario creador:</span>{" "}
                {data.aviso_debito.usuario_creador}
              </p>
            </div>
            <div className="text-right">
              <p className="mb-2">
                <span className="font-semibold">Moneda:</span>{" "}
                {data.aviso_debito.moneda}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Tipo de cambio:</span>{" "}
                {data.aviso_debito.tipo_cambio_moneda}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Fecha de creación:</span>{" "}
                {new Intl.DateTimeFormat("es-PE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(new Date(data.aviso_debito.fecha_creation))}
              </p>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-md mb-4">INFORMACIÓN DEL CLIENTE</h4>
            <div className="text-sm space-y-2">
              <p>
                <span className="font-semibold">Cliente:</span>{" "}
                {data.aviso_debito.cliente}
              </p>
              <p>
                <span className="font-semibold">RUC:</span>{" "}
                {data.aviso_debito.ruc}
              </p>
              <p>
                <span className="font-semibold">Dirección:</span>{" "}
                {data.aviso_debito.direccion}
              </p>
              <p>
                <span className="font-semibold">Contacto:</span>{" "}
                {data.aviso_debito.contacto}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-md mb-4">INFORMACIÓN DE PAGO</h4>
            <div className="text-sm space-y-2">
              <p>
                <span className="font-semibold">Importe total:</span> S/
                {data.aviso_debito.importe_total}
              </p>
              <p>
                <span className="font-semibold">Condición de pago:</span> 30
                dias
              </p>
              <p>
                {(data.aviso_debito.estado === "MIGRADO" ||
                  data.aviso_debito.estado === "ANULADO") && (
                  <>
                    <span className="font-semibold">Migrado a SAP:</span>{" "}
                    {data.aviso_debito.numero_sap
                      ? data.aviso_debito.estado === "ANULADO"
                        ? "Si - anulado"
                        : "Sí"
                      : "No"}
                  </>
                )}
              </p>
              {(data.aviso_debito.estado === "MIGRADO" ||
                data.aviso_debito.estado === "ANULADO") && (
                <p>
                  <span className="font-semibold">Fecha de migración:</span>{" "}
                  10/03/2025 14:05:30
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-md mb-4">DETALLE DEL AVISO</h4>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">N°</th>
                <th className="border p-2 text-left">Tipo de concepto</th>
                <th className="border p-2 text-left">Código</th>
                <th className="border p-2 text-left">Descripción</th>
                <th className="border p-2 text-right">Cant.</th>
                <th className="border p-2 text-right">P. Unit.</th>
                <th className="border p-2 text-right">Importe</th>
              </tr>
            </thead>
            <tbody>
              {data.detalle_aviso_debito?.map((detalle: any, index: any) => (
                <tr key={detalle.id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{detalle.tipo_concepto}</td>
                  <td className="border p-2">{detalle.codigo_concepto}</td>
                  <td className="border p-2">{detalle.descripcion_concepto}</td>
                  <td className="border p-2 text-right">{detalle.cantidad}</td>
                  <td className="border p-2 text-right">
                    {detalle.precio_unitario}
                  </td>
                  <td className="border p-2 text-right">{detalle.importe}</td>
                </tr>
              ))}
              {/* <tr>
                <td className="border p-2">2</td>
                <td className="border p-2">Anticipo</td>
                <td className="border p-2">ANT-2025-004</td>
                <td className="border p-2">
                  Viáticos y gastos adicionales Viaje Lima-Cusco
                </td>
                <td className="border p-2 text-right">1</td>
                <td className="border p-2 text-right">500.00</td>
                <td className="border p-2 text-right">500.00</td>
              </tr> */}
              <tr className="font-bold">
                <td colSpan={6} className="border p-2 text-right">
                  Total
                </td>
                <td className="border p-2 text-right">
                  {data.aviso_debito.importe_total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-md mb-4">OBSERVACIONES</h4>
          <p className="text-sm">{data.aviso_debito.observaciones}</p>
        </div>

        <div className="flex justify-end space-x-4">
          {data.aviso_debito.estado === "MIGRADO" && (
            <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            onClick={() => {
              setSelectedNotices([
                {
                  numero_aviso: data.aviso_debito.numero_aviso,
                  fecha_emision: data.aviso_debito.fecha_emision,
                  cliente: data.aviso_debito.cliente,
                  importe_total: data.aviso_debito.importe_total,
                  numero_sap: data.aviso_debito.numero_sap,
                  estado: data.aviso_debito.estado,
                },
              ]);
              
              console.log('VER DETALLE DEBITO ANULADO',selectedNotices)
              openModal("modal-anular", (close) => (
                <AnularAvisosSAP
                onClose={close}
                 onConfirm={onAnular}
                 selectedNotices={selectedNotices}
                />
              ));
            }}
            disabled={isPending}
          >
            Anular
          </button>
          )}

          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm flex items-center">
            <PrinterIcon className="h-4 w-4 mr-2" /> Imprimir
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm flex items-center">
            <FolderArrowDownIcon className="h-4 w-4 mr-2" /> Exportar
          </button>
        </div>
      </div>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useUI } from "../store/useUi.store";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import capitalize from "capitalize";
import { getStatusColor } from "../utils/color";
import { useNavigate } from "react-router";

interface Props {
  data: any;
}

export const EditDetailDebit = ({ data }: Props) => {
  const { isShowEditDebitNotice, toogleEditDebitNotice } = useUI();
  // Lista de clientes de ejemplo
  const navigate = useNavigate();
  const clientesList = [
    {
      nombre: "INDUSTRIAS METAL PERU SAC",
      ruc: "20123456781",
      direccion: "Av. Industrial 345, Callao",
      contacto: "Ricardo Mendoza",
    },
    {
      nombre: "COMERCIAL ANDINA EIRL",
      ruc: "20587654321",
      direccion: "Jr. Huallaga 215, Lima",
      contacto: "María Santos",
    },
    {
      nombre: "CONSTRUCTORA DEL SUR SAC",
      ruc: "20345678912",
      direccion: "Av. Arequipa 1050, Lima",
      contacto: "Jorge Vargas",
    },
  ];

  // Estado para almacenar el cliente seleccionado
  const [clienteSeleccionado, setClienteSeleccionado] = useState(
    clientesList[0]
  );

  // Datos fijos del aviso
  const [avisoData, setAvisoData] = useState({
    numero: "AD-0002",
    fechaEmision: "29/03/2025",
    usuarioCreador: "Ricardo Mendoza",
    moneda: "PEN",
    tipoCambio: "3.57",
    fechaCreacion: "29/03/2025, 01:28:47 a. m.",
    importeTotal: "S/500",
    condicionPago: "30 dias",
    migradoSAP: "No",
    fechaMigracion: "10/03/2025 14:05:30",
  });

  // Manejar cambio de cliente seleccionado
  const handleClienteChange = (e) => {
    const selectedCliente = clientesList.find(
      (cliente) => cliente.nombre === e.target.value
    );
    setClienteSeleccionado(selectedCliente);
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => {
              navigate("/gestion-comercial/avisos-debito");
              setTimeout(() => {
                toogleEditDebitNotice();
              }, 100);
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
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-md mb-4">INFORMACIÓN DEL CLIENTE</h4>

            <div className="mb-3 flex items-center gap-2">
              <label className="block font-semibold mb-1">Cliente:</label>
              <select
                className="w-full border rounded p-2"
                value={clienteSeleccionado.nombre}
                onChange={handleClienteChange}
              >
                {clientesList.map((cliente, index) => (
                  <option key={index} value={cliente.nombre}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <label className="block font-semibold mb-1">RUC:</label>
              <input
                type="text"
                className="w-full rounded p-2 bg-gray-100"
                value={clienteSeleccionado.ruc}
                readOnly
              />
            </div>

            <div className="mb-3 flex items-center gap-2">
              <label className="block font-semibold mb-1">Dirección:</label>
              <input
                type="text"
                className="w-full rounded p-2 bg-gray-100"
                value={clienteSeleccionado.direccion}
                readOnly
              />
            </div>

            <div className="mb-3 flex items-center gap-2">
              <label className="block font-semibold mb-1">Contacto:</label>
              <input
                type="text"
                className="w-full rounded p-2 bg-gray-100"
                value={clienteSeleccionado.contacto}
                readOnly
              />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-md mb-4">INFORMACIÓN DE PAGO</h4>
            <div className="text-sm space-y-2">
              <p className="mb-4">
                <span className="font-semibold">Importe total:</span> S/
                {data.aviso_debito.importe_total}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Condición de pago:</span> 30
                dias
              </p>
              <p className="mb-4">
                <span className="font-semibold">Migrado a SAP:</span>{" "}
                {data.aviso_debito.numero_sap
                  ? data.aviso_debito.estado === "ANULADO"
                    ? "Si - anulado"
                    : "Sí"
                  : "No"}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Fecha de migración:</span>{" "}
                10/03/2025 14:05:30
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

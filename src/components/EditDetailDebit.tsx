/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useClientes } from "../hooks/useClientes";
import { useUI } from "../store/useUi.store";
import useUserManagementStore from "../store/useUserManagement.store";
import { usePutDebitNotice } from "../hooks/useDebitNotices";

interface Props {
  data: any;
}

export const EditDetailDebit = ({ data }: Props) => {
  console.log("🚀 ~ EditDetailDebit ~ data:", data);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { toogleEditDebitNotice } = useUI();
  const { id: idUsuario } = useUserManagementStore();
  const { mutate } = usePutDebitNotice();

  const [clienteSeleccionado, setClienteSeleccionado] = useState({
    id: data.aviso_debito.id_cliente,
    estado: data.aviso_debito.estado,
    nombre: data.aviso_debito.id_cliente,
    ruc: data.aviso_debito.ruc,
    direccion: data.aviso_debito.direccion,
    contacto: data.aviso_debito.contacto,
  });

  const { data: clientesList, isLoading } = useClientes();
  const [estadoAviso, setEstadoAviso] = useState(data.aviso_debito.estado);
  const [avisoData, setAvisoData] = useState({
    observaciones: data.aviso_debito.observaciones,
  });
  if (isLoading) return null;

  const handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCliente = clientesList.find(
      (cliente) => cliente.nombre === e.target.value
    );
    setClienteSeleccionado(selectedCliente);
  };
  const estadoColors = {
    Borrador: "bg-yellow-100 text-yellow-800",
    Pendiente: "bg-blue-100 text-blue-800",
  };
  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadoAviso(e.target.value);
  };

  const handleEditDebotNotice = () => {
    const id = data.aviso_debito.id;
    const updateData = {
      observaciones: avisoData.observaciones,
      estado: estadoAviso.toUpperCase(),
      id_cliente: clienteSeleccionado.id,
      id_usuario_modificador: idUsuario,
    };

    console.log(id, updateData, "prueba");
    mutate({ id, data: updateData });
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate("/gestion-comercial/avisos-debito");
    }, 2000);
  };
  return (
    <>
      {showModal && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-center text-sm">Aviso modificado correctamente</p>
        </div>
      )}
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
        {/* <span
          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
            data.aviso_debito.estado
          )}`}
        >
          {capitalize(data.aviso_debito.estado)}
        </span> */}
        <div className="flex items-center space-x-3">
          <label htmlFor="estadoSelect" className="font-medium">
            Estado:
          </label>
          <select
            id="estadoSelect"
            className={`px-4 py-1 rounded ${estadoColors[estadoAviso]}`}
            value={estadoAviso}
            onChange={handleEstadoChange}
          >
            {clienteSeleccionado.estado === "BORRADOR" ? (
              <>
                <option value="Borrador">BORRADOR</option>
                <option value="Pendiente">PENDIENTE</option>
              </>
            ) : (
              <>
                <option value="Pendiente">PENDIENTE</option>
                <option value="Borrador">BORRADOR</option>
              </>
            )}
          </select>
        </div>
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
                {clientesList
                  ?.sort((a: any, b: any) => {
                    if (a.id === data.aviso_debito.id_cliente) return -1;
                    if (b.id === data.aviso_debito.id_cliente) return 1;
                    return 0;
                  })
                  .map((cliente: any) => (
                    <option key={cliente.ruc} value={cliente.nombre}>
                      {cliente.nombre}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <label className="block font-semibold mb-1">RUC:</label>
              <input
                type="text"
                className="w-full rounded p-2 bg-gray-100 focus:outline-none"
                value={clienteSeleccionado.ruc}
                readOnly
              />
            </div>

            <div className="mb-3 flex items-center gap-2">
              <label className="block font-semibold mb-1">Dirección:</label>
              <input
                type="text"
                className="w-full rounded p-2 bg-gray-100 focus:outline-none"
                value={clienteSeleccionado.direccion}
                readOnly
              />
            </div>

            <div className="mb-3 flex items-center gap-2">
              <label className="block font-semibold mb-1">Contacto:</label>
              <input
                type="text"
                className="w-full rounded p-2 bg-gray-100 focus:outline-none"
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
            </div>
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

      <div className="mb-6 px-6">
        <h4 className="font-bold text-md mb-4">OBSERVACIONES</h4>
        <textarea
          className="w-full rounded p-2 border border-gray-300"
          value={avisoData.observaciones}
          onChange={(e) => {
            setAvisoData({ ...avisoData, observaciones: e.target.value });
          }}
        />
      </div>

      <button
        onClick={handleEditDebotNotice}
        type="submit"
        className="text-white px-4 py-2 bg-[#1E68CA]  rounded hover:bg-blue-900"
      >
        Actualizar
      </button>
    </>
  );
};

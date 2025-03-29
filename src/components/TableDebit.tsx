import { useState } from "react";
import { useDebitNotices } from "../hooks/useDebitNotices";
import { formatDate } from "../utils/dateUtils";

import {
  EyeIcon,
  FolderArrowDownIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import DebtNoticesTableSkeleton from "./DebtNoticesTableSkeleton";
import useUserManagementStore from "../store/useUserManagement.store";
import toast from "react-hot-toast";
import { useChangeStateDebitNote } from "../hooks/useChangeStateDebitNote";

interface DebitNotice {
  numero_aviso: string;
  fecha_emision: string;
  cliente: string;
  importe_total: number;
  numero_sap: string | null;
  estado: string;
}

export const TableDebit = () => {
  const { data, isLoading } = useDebitNotices();
  const { id } = useUserManagementStore();
  const [selectedNotices, setSelectedNotices] = useState<string[]>([]);
  const navigate = useNavigate();
  const { mutate: changeStateDebitNote, isPending } = useChangeStateDebitNote();

  const onMigrate = () => {
    if (selectedNotices.length === 0) {
      toast("No se puede migrar, no hay avisos seleccionados", {
        icon: "🚨",
        duration: 4000,
      });
      return;
    }
    changeStateDebitNote({
      usuario_modificador: id,
      estado_final: "MIGRADO",
      avisos: selectedNotices,
    });
  };

  const onAnular = () => {
    if (selectedNotices.length === 0) {
      toast("No se puede anular, no hay avisos seleccionados", {
        icon: "🚨",
        duration: 4000,
      });
      return;
    }
    changeStateDebitNote({
      usuario_modificador: id,
      estado_final: "ANULADO",
      avisos: selectedNotices,
    });
  };

  if (isLoading) {
    return <DebtNoticesTableSkeleton />;
  }

  const allSelected = selectedNotices.length === data.length && data.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedNotices([]);
    } else {
      setSelectedNotices(
        data.map((notice: DebitNotice) => notice.numero_aviso)
      );
    }
  };

  const toggleSelectOne = (numero_aviso: string) => {
    setSelectedNotices((prev) =>
      prev.includes(numero_aviso)
        ? prev.filter((id) => id !== numero_aviso)
        : [...prev, numero_aviso]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "borrador":
        return "bg-yellow-100 text-yellow-800";
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "migrado":
        return "bg-green-100 text-green-800";
      case "anulado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                N° Aviso
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Importe
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                N° SAP
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((debitNotice: DebitNotice) => (
              <tr key={debitNotice.numero_aviso} className="hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={selectedNotices.includes(debitNotice.numero_aviso)}
                    onChange={() => toggleSelectOne(debitNotice.numero_aviso)}
                  />
                </td>
                <td className="p-3 text-sm font-medium text-gray-900">
                  {debitNotice.numero_aviso}
                </td>
                <td className="p-3 text-sm text-gray-500">
                  {formatDate(debitNotice.fecha_emision)}
                </td>
                <td className="p-3 text-sm text-gray-500 text-[13px]">
                  {debitNotice.cliente}
                </td>
                <td className="p-3 text-sm text-gray-500">
                  S/ {debitNotice.importe_total.toFixed(2)}
                </td>
                <td className="p-3 text-sm text-gray-500 text-center">
                  {debitNotice.numero_sap ?? "-"}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      debitNotice.estado
                    )}`}
                  >
                    {debitNotice.estado.toLowerCase()}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-500 flex justify-center">
                  <EyeIcon
                    className="size-6 cursor-pointer"
                    title="Ver detalle"
                    onClick={() => {
                      navigate(
                        `/gestion-comercial/avisos-debito/${debitNotice.numero_aviso}`
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              onClick={onMigrate}
              disabled={isPending}
            >
              Migrar a SAP
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              onClick={onAnular}
              disabled={isPending}
            >
              Anular
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm flex items-center">
              <PrinterIcon className="h-4 w-4 mr-2" /> Imprimir
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm flex items-center">
              <FolderArrowDownIcon className="h-4 w-4 mr-2" /> Exportar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

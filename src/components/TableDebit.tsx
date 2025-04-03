import { useState } from "react";
import { useDebitNotices } from "../hooks/useDebitNotices";
import { formatDate } from "../utils/dateUtils";

import {
  EyeIcon,
  FolderArrowDownIcon,
  PrinterIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import DebtNoticesTableSkeleton from "./DebtNoticesTableSkeleton";
import useUserManagementStore from "../store/useUserManagement.store";
import toast from "react-hot-toast";
import { useChangeStateDebitNote } from "../hooks/useChangeStateDebitNote";
import useModalStore from "../store/useModalStore.store";
import AnularAvisosSAP from "./AnularAvisosSAP";
import MigrarAvisosSAP from "./MigrarAvisosSAP";
import { useUI } from "../store/useUi.store";
import { usePagination } from "../hooks/usePagination";

export interface DebitNotice {
  numero_aviso: string;
  fecha_emision: string;
  cliente: string;
  importe_total: number;
  numero_sap: string | null;
  estado: string;
}

export const TableDebit = () => {
  const { data, isLoading } = useDebitNotices();
  const { currentPage, totalPages, goToPage, startIndex, endIndex, pages } =
    usePagination({ totalItems: data?.length });
  const currentPageData = data?.slice(startIndex, endIndex);
  const { toogleEditDebitNotice, setIsShowEditDebitNotice } = useUI();

  const { openModal } = useModalStore();
  const { id } = useUserManagementStore();
  const [selectedNotices, setSelectedNotices] = useState<DebitNotice[]>([]);
  const navigate = useNavigate();
  const { mutateAsync: changeStateDebitNote, isPending } =
    useChangeStateDebitNote();

  const onMigrate = (avisos: string[], close: () => void) => {
    const changeStateDebitNotePromise = changeStateDebitNote({
      usuario_modificador: id,
      estado_final: "MIGRADO",
      avisos,
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

  if (isLoading) {
    return <DebtNoticesTableSkeleton />;
  }

  const allSelected = selectedNotices.length === data.length && data.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedNotices([]);
    } else {
      setSelectedNotices(data);
    }
  };

  const toggleSelectOne = (deb: DebitNotice) => {
    setSelectedNotices((prev) =>
      prev.some((notice) => notice.numero_aviso === deb.numero_aviso)
        ? prev.filter((notice) => notice.numero_aviso !== deb.numero_aviso)
        : [...prev, deb]
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
            {currentPageData?.map((debitNotice: DebitNotice) => (
              <tr key={debitNotice.numero_aviso} className="hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={selectedNotices
                      .map((v) => v.numero_aviso)
                      .includes(debitNotice.numero_aviso)}
                    onChange={() => toggleSelectOne(debitNotice)}
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
                  S/ {(debitNotice.importe_total ?? 0).toFixed(2)}
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
                <td className="p-3 text-sm text-gray-500 flex justify-center gap-3 items-center">
                  <EyeIcon
                    className="size-6 cursor-pointer"
                    title="Ver detalle"
                    onClick={() => {
                      setIsShowEditDebitNotice(false);
                      navigate(
                        `/gestion-comercial/avisos-debito/${debitNotice.numero_aviso}`
                      );
                    }}
                  />
                  {(debitNotice.estado.toLowerCase() === "borrador" ||
                    debitNotice.estado.toLowerCase() === "pendiente") && (
                    <PencilSquareIcon
                      className="size-6 cursor-pointer"
                      title="Editar"
                      onClick={() => {
                        toogleEditDebitNotice();
                        setTimeout(() => {
                          setIsShowEditDebitNotice(true);
                          navigate(`/gestion-comercial/avisos-debito/${debitNotice.numero_aviso}`);
                        }, 100);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              onClick={() => {
                if (selectedNotices.length === 0) {
                  toast("No se puede migrar, no hay avisos seleccionados", {
                    icon: "🚨",
                    duration: 4000,
                  });
                  return;
                }
                openModal("modal-migrate", (close) => (
                  <MigrarAvisosSAP
                    onClose={close}
                    onConfirm={onMigrate}
                    selectedNotices={selectedNotices}
                  />
                ));
              }}
              disabled={isPending}
            >
              Migrar a SAP
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              onClick={() => {
                if (selectedNotices.length === 0) {
                  toast("No se puede anular, no hay avisos seleccionados", {
                    icon: "🚨",
                    duration: 4000,
                  });
                  return;
                }
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
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm flex items-center">
              <PrinterIcon className="h-4 w-4 mr-2" /> Imprimir
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm flex items-center">
              <FolderArrowDownIcon className="h-4 w-4 mr-2" /> Exportar
            </button>
          </div>

          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex space-x-2">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    page === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-700 ml-2">
              Página {currentPage} de {totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

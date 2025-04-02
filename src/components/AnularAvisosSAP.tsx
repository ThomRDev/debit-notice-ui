import { useState } from "react";
import { DebitNotice } from "./TableDebit";

export interface AnularAvisosSAPProps {
  onClose: () => void;
  onConfirm: (avisos: string[], motivo: string, close: () => void) => void;
  selectedNotices: DebitNotice[];
}
const AnularAvisosSAP = ({
  onClose,
  onConfirm,
  selectedNotices,
}: AnularAvisosSAPProps) => {
  const [avisosAnulables] = useState<DebitNotice[]>(() => {
    return selectedNotices.filter((aviso) => aviso.estado === "MIGRADO");
  });
  const [avisosNoAnulables] = useState<DebitNotice[]>(() => {
    return selectedNotices.filter((aviso) => aviso.estado !== "MIGRADO");
  });
  const [motivo, setMotivo] = useState("");
  const [error, setError] = useState(false);

  const handleConfirm = () => {
    if (!motivo.trim()) {
      setError(true);
      return;
    }
    onConfirm(
      avisosAnulables.map((aviso) => aviso.numero_aviso),
      motivo,
      onClose
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-full max-w-lg">
        {/* Encabezado */}
        <div className="bg-red-600 text-white px-4 py-2 rounded-t-md flex justify-between items-center">
          <h2 className="text-lg font-semibold">Anular Avisos en SAP</h2>
          <button onClick={onClose} className="text-white text-xl font-bold">
            ×
          </button>
        </div>

        <div className="p-4">
          <p className="text-gray-700 mb-3">
            Está a punto de anular los siguientes avisos en SAP:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-md mb-4">
            {avisosAnulables.map((aviso) => (
              <div
                key={aviso.numero_aviso}
                className="p-3 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{aviso.numero_aviso}</span>
                  <div className="flex flex-col">
                    <span className="text-sm">{aviso.cliente}</span>
                    <span className="text-gray-600">{`Nº SAP: ${aviso.numero_sap}`}</span>
                  </div>
                  <span className="text-right">{`S/ ${aviso.importe_total.toFixed(
                    2
                  )}`}</span>
                </div>
              </div>
            ))}
          </div>

          {avisosNoAnulables.length > 0 && (
            <>
              <h3 className="text-sm font-semibold mb-2">
                Avisos que NO se pueden anular:
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-md mb-4">
                {avisosNoAnulables.map((aviso) => (
                  <div
                    key={aviso.numero_aviso}
                    className="p-3 border-b border-red-100 last:border-b-0"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{aviso.numero_aviso}</span>
                      <span>{aviso.cliente}</span>
                      <span className="text-right">{`S/ ${aviso.importe_total.toFixed(
                        2
                      )}`}</span>
                    </div>
                    <div className="mt-1 text-red-600 text-xs">
                      Estado incorrecto: debe estar MIGRADO
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Mensaje de advertencia */}
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 text-red-600 text-sm">
            Esta acción anulará los avisos en SAP y cambiará su estado a
            "Anulado". Esta operación no es reversible.
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivo de anulación: <span className="text-red-500">*</span>
            </label>
            <textarea
              className={`w-full border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
              rows={3}
              placeholder="Ingrese motivo por el cual se anulan los avisos..."
              value={motivo}
              onChange={(e) => {
                setMotivo(e.target.value);
                if (e.target.value.trim()) setError(false);
              }}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">
                Por favor ingrese un motivo de anulación.
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Confirmar Anulación
            </button>
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnularAvisosSAP;

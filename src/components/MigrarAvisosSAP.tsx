import { useState } from "react";
import { DebitNotice } from "./TableDebit";

interface MigrarAvisosSAPProps {
  onClose: () => void;
  onConfirm: (avisos: string[], close: () => void) => void;
  selectedNotices: DebitNotice[];
}

const MigrarAvisosSAP = ({
  onClose,
  onConfirm,
  selectedNotices,
}: MigrarAvisosSAPProps) => {
  console.log("🚀 ~ selectedNotices:", selectedNotices);

  const [avisosMigrables] = useState(() => {
    return selectedNotices.filter((aviso) => aviso.estado === "PENDIENTE");
  });

  const [avisosNoMigrables] = useState(() => {
    return selectedNotices.filter((aviso) => aviso.estado !== "PENDIENTE");
  });

  const total = avisosMigrables.reduce(
    (sum, aviso) => sum + aviso.importe_total,
    0
  );

  return (
    <div className="inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-full flex-1">
        {/* Encabezado */}
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t-md flex justify-between items-center">
          <h2 className="text-lg font-semibold">Migrar Avisos a SAP</h2>
          <button onClick={onClose} className="text-white text-xl font-bold">
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 w-full">
          <p className="text-gray-700 mb-3">
            Está a punto de migrar los siguientes avisos a SAP:
          </p>

          {/* Avisos migrables */}
          <div className="bg-gray-50 border border-gray-200 rounded-md mb-4">
            <table className="w-full">
              <thead className="text-xs text-gray-700">
                <tr>
                  <th className="py-2 px-3 text-left">CÓDIGO</th>
                  <th className="py-2 px-3 text-left">DESCRIPCIÓN</th>
                  <th className="py-2 px-3 text-right">MONTO</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {avisosMigrables.map((aviso) => (
                  <tr
                    key={aviso.numero_aviso}
                    className="border-t border-gray-200"
                  >
                    <td className="py-2 px-3">{aviso.numero_aviso}</td>
                    <td className="py-2 px-3">{aviso.cliente}</td>
                    <td className="py-2 px-3 text-right">
                      S/ {aviso.importe_total.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-gray-200">
                  <td colSpan={2}></td>
                  <td className="py-2 px-3 text-right font-semibold">
                    Total: S/ {total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Avisos NO migrables */}
          {avisosNoMigrables.length > 0 && (
            <>
              <h3 className="text-sm font-semibold mb-2">
                Avisos que NO se pueden migrar:
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-md mb-4">
                <table className="w-full">
                  <thead className="text-xs text-gray-700">
                    <tr>
                      <th className="py-2 px-3 text-left">CÓDIGO</th>
                      <th className="py-2 px-3 text-left">DESCRIPCIÓN</th>
                      <th className="py-2 px-3 text-left">MOTIVO</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {avisosNoMigrables.map((aviso) => (
                      <tr
                        key={aviso.numero_aviso}
                        className="border-t border-red-100"
                      >
                        <td className="py-2 px-3">{aviso.numero_aviso}</td>
                        <td className="py-2 px-3">{aviso.cliente}</td>
                        <td className="py-2 px-3 text-red-600 text-xs">
                          Estado incorrecto: {aviso.estado}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Mensaje de advertencia */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 mb-4 text-yellow-800 text-sm">
            Esta acción enviará los datos a SAP y cambiará el estado de los
            avisos seleccionados a "Migrado". SAP devolverá un número de
            referencia que se guardará automáticamente.
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() =>
                onConfirm(
                  avisosMigrables.map((aviso) => aviso.numero_aviso),
                  onClose
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Confirmar y Enviar
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

export default MigrarAvisosSAP;

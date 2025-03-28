export const TableDebit = () => {
  const invoices = [
    {
      nAviso: "AD-0001",
      fecha: "15/03/2025",
      cliente: "TRANSPORTES S.A",
      ruc: "20512345678",
      importe: 1250.0,
      nSap: "",
      estado: "Borrador",
    },
    {
      nAviso: "AD-0002",
      fecha: "14/03/2025",
      cliente: "SERVICIOS GENERA",
      ruc: "20523456789",
      importe: 850.5,
      nSap: "",
      estado: "Pendiente",
    },
    {
      nAviso: "AD-0003",
      fecha: "12/03/2025",
      cliente: "DISTRIBUIDORA PER",
      ruc: "20523456789",
      importe: 425.8,
      nSap: "",
      estado: "Pendiente",
    },
    {
      nAviso: "AD-0004",
      fecha: "10/03/2025",
      cliente: "INVERSIONES ABC",
      ruc: "20534567890",
      importe: 1750.0,
      nSap: "402587",
      estado: "Migrado",
    },
    {
      nAviso: "AD-0005",
      fecha: "07/03/2025",
      cliente: "COMERCIAL XYZ",
      ruc: "20645678901",
      importe: 320.0,
      nSap: "402342",
      estado: "Anulado",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Borrador":
        return "bg-yellow-100 text-yellow-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Migrado":
        return "bg-green-100 text-green-800";
      case "Anulado":
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice, index) => (
              <tr key={invoice.nAviso} className="hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    defaultChecked={index < 2}
                  />
                </td>
                <td className="p-3 text-sm font-medium text-gray-900">
                  {invoice.nAviso}
                </td>
                <td className="p-3 text-sm text-gray-500">{invoice.fecha}</td>
                <td className="p-3 text-sm text-gray-500">{invoice.cliente}</td>
                <td className="p-3 text-sm text-gray-500">
                  S/ {invoice.importe.toFixed(2)}
                </td>
                <td className="p-3 text-sm text-gray-500">{invoice.nSap}</td>
                <td className="p-3">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      invoice.estado
                    )}`}
                  >
                    {invoice.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
              Migrar a SAP
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
              Anular
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">
              Imprimir
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">
              Exportar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

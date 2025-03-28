import { useQuery } from "@tanstack/react-query";
import { AdvanceRequestApi } from "../config/apiAdvanceRequest";
import { useState } from "react";

const TableAdvanceRequest = () =>{

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const {data : response} = useQuery({
        queryKey:['advances', currentPage],
        queryFn: async()=>{
            const data = await AdvanceRequestApi.getAll(null,currentPage, pageSize);
            console.log(data.data)
            return data;
        }
    })

    const totalCount = response?.total_count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    
    return (<>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full table-auto">
                <thead className="bg-gray-100 border-b">
                <tr>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        N° Solicitud
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de solicitud
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Solicitante
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Moneda
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Importe
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {response?.data?.map((advance) => (
                    <tr key={advance.id} className="hover:bg-gray-50">
                        <td className="p-3 text-sm font-medium text-gray-900">
                        {advance.numero_solicitud}
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                        {new Date(advance.fecha_solicitud).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                        {advance.solicitante}
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                        {advance.moneda}
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                            {advance.importe.toFixed(2)}
                        </td>
                        <td className="p-3">
                        <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${advance.estado}`}
                        >
                            {advance.estado}
                        </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
                <div>
                    <p className="text-sm text-gray-700">
                        Página <span className="font-medium">{currentPage}</span> de{' '}
                        <span className="font-medium">{totalPages}</span> •{' '}
                        <span className="font-medium">{totalCount}</span> registros en total
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default TableAdvanceRequest;
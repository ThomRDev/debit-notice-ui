import { useQuery } from "@tanstack/react-query";
import { AdvanceRequestApi } from "../config/apiAdvanceRequest";
import { useState } from "react";
import { useSearchAdvanceRequest } from "../hooks/useSearchAdvanceRequest";
import { useAdvanceRequestSelected } from "../store/useAdvanceRequestSelected.store";
import { AdvanceRequestData } from "../config/interface/AdvanceRequest";

const TableAdvanceRequest = () =>{
    const { addSelectedAdvance, removeSelectedAdvance, isSelected } = useAdvanceRequestSelected();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { numeroSolicitud, setNumeroSolicitud, handleSearch, handleClear, isSearching, searchResults, isSearchActive,error} = useSearchAdvanceRequest();

    const {data : response} = useQuery({
        queryKey:['advances', currentPage],
        queryFn: async()=>{
            const data = await AdvanceRequestApi.getAll(null,currentPage, pageSize);
            return data;
        }
    })

    const totalCount = isSearchActive? searchResults?.total_count : response?.total_count;
    const totalPages = isSearchActive? searchResults?.current_page : Math.ceil((totalCount ?? 1) / pageSize);
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    
    const safeTotalPages = totalPages ?? 1;
    const handleNextPage = () => {
        if (currentPage < safeTotalPages) setCurrentPage(currentPage + 1);
    };
    
    const toggleSelection = (advance:AdvanceRequestData) => {
        if (isSelected(advance.id)) {
          removeSelectedAdvance(advance.id);
        } else {
          addSelectedAdvance(advance);
        }
      };

    const dataSearch = isSearchActive? searchResults?.data : response?.data;
    return (<>
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Buscar por Nº de solicitud:</span>
                <input 
                    type="text" 
                    className="border border-gray-300 rounded px-3 py-1 text-sm w-full max-w-xs" 
                    placeholder="Buscar..."
                    value={numeroSolicitud}
                    onChange={(e) => setNumeroSolicitud(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                    className={`bg-blue-600 text-white px-3 py-1 rounded text-sm ${
                    isSearching ? 'opacity-75' : 'hover:bg-blue-700'
                    }`}
                    onClick={handleSearch}
                    disabled={isSearching}
                >
                    {isSearching ? (
                    <span className="flex items-center gap-1">
                        Buscando...
                    </span>
                    ) : (
                    'Buscar'
                    )}
                </button>
                <button 
                    className="text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-100"
                    onClick={handleClear}
                >
                    Limpiar
                </button>
            </div>
            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">
                    Error: {error.message}
                </div>
            )}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full table-auto">
                <thead className="bg-gray-100 border-b">
                <tr>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seleccionar
                    </th>
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
                    {dataSearch?.map((advance) => {
                    const selected = isSelected(advance.id);
                    return (
                        <tr 
                        key={advance.id} 
                        className={`hover:bg-gray-50 ${selected ? 'bg-blue-50' : ''}`}
                        >
                        <td className="p-3 text-center">
                            <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleSelection(advance)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                        </td>
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
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${advance.estado}`}>
                            {advance.estado}
                            </span>
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
                
            </table>
            
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
                <div>
                    <p className="text-sm text-gray-700">
                        Página <span className="font-medium">{currentPage}</span> de{' '}
                        <span className="font-medium">{totalPages}</span> •{' '}
                        <span className="font-medium">{ totalCount}</span> registros en total
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
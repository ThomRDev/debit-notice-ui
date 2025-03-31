import { useState } from "react";
import { DebitNoticeForm } from "../components/DebitNoticeForm";
import TableAdvanceRequest from "../components/TableAdvanceRequest";
import { DebitNoticeDetailForm } from "../components/DebitNoticeDetailForm";

type TabType = 'general' | 'detalle' | 'anticipo';
export const DebitNoticeCreate = ()=>{
    const [activeTab, setActiveTab] = useState<TabType>('general');
    return(
        <>
        <div className="p-4 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-gray-800">Crear Aviso de Débito</h1>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                    ← Volver al listado
                </button>
            </div>
            
            <div className="mb-6 text-sm">
                <span className="font-medium">Nº Temporal: AD-0006</span>
            </div>
            
            <div className="flex border-b border-gray-200 gap-1 mb-6">
                <button
                    className={`py-2 px-4 font-medium text-sm ${activeTab === 'general' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('general')}
                >
                    Información General
                </button>
                <button
                    className={`py-2 px-4 font-medium text-sm ${activeTab === 'detalle' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('detalle')}
                >
                    Detalle
                </button>
                <button
                    className={`py-2 px-4 font-medium text-sm ${activeTab === 'anticipo' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('anticipo')}
                >
                    Anticipo
                </button>
            </div>

            <div>
                {activeTab === 'general' && (
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-black mb-4">Información General de Aviso</h3>
                        <DebitNoticeForm />
                    </div>
                )}
                
                {activeTab === 'detalle' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-black mb-4">Detalles</h3>
                        <DebitNoticeDetailForm></DebitNoticeDetailForm>
                    </div>
                )}
                
                {activeTab === 'anticipo' && (
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-black mb-4">Solicitudes de Anticipo</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Seleccione las solicitudes de anticipo que desea vincular a este aviso de débito.
                            </p>
                            
                            <TableAdvanceRequest />
                            
                            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
                                <div>
                                    <span className="font-medium text-sm">Total anticipos seleccionados:</span>
                                    <span className="ml-2 font-bold">S/ 0.00</span>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300">
                                        Anterior
                                    </button>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                                        Agregar
                                    </button>
                                    <button className="text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-100">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-4">
                                Al agregar anticipos, estos se incluirán como conceptos en el detalle del aviso de débito.
                            </p>
                        </div>
                        
                        <div className="text-xs text-gray-500 text-right">
                            Paso 3 de 3
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}
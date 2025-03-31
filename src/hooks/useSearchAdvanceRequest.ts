import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdvanceRequestApi } from '../config/apiAdvanceRequest';
import { ApiResponse } from '../config/interface/AdvanceRequest';

export const useSearchAdvanceRequest = () => {
    const [numeroSolicitud, setNumeroSolicitud] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchMessage, setSearchMessage] = useState('');
  
    const searchQuery = useQuery<ApiResponse | null>({
      queryKey: ['advanceByNumber', numeroSolicitud],
      queryFn: async (): Promise<ApiResponse | null> => {
        if (!numeroSolicitud.trim()) {
          setSearchMessage('Ingrese un número de solicitud');
          return null;
        }
  
        try {
          const response = await AdvanceRequestApi.getByNumber(numeroSolicitud);
          setSearchMessage('');
          return response;
        } catch (error) {
          setSearchMessage('No hay Solicitud de Anticipo con ese Numero' + error);
          return null;
        }
      },
      enabled: false,
      staleTime: 60000,
    });
  
    const handleSearch = () => {
      if (numeroSolicitud.trim()) {
        setIsSearchActive(true);
        searchQuery.refetch();
      }
    };
  
    const handleClear = () => {
      setNumeroSolicitud('');
      setIsSearchActive(false);
      setSearchMessage('');
    };
  
    return {
      numeroSolicitud,
      setNumeroSolicitud,
      handleSearch,
      handleClear,
      searchResults: searchQuery.data, // Ahora es ApiResponse | null
      searchMessage,
      isSearching: searchQuery.isFetching,
      isSearchActive,
      error: searchQuery.error,
    };
  };
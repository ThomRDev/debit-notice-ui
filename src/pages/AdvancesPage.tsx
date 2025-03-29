import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TableAdvanceRequest from "../components/TableAdvanceRequest";



const queryClient = new QueryClient({
  defaultOptions:{
      queries:{
          retry:2,
          staleTime: 1000 * 60 * 5,
      }
  }
});

export const AdvancesPage = () => {
  return (
      <div>
        <section className="flex justify-between items-center ">
          <header>
            <h2 className="text-xl font-bold">Solicitudes de Anticipos</h2>
          </header>
        </section>
        <section>
          <QueryClientProvider client={queryClient}>
            <TableAdvanceRequest></TableAdvanceRequest>
          </QueryClientProvider>
          
        </section>
      </div>
    );
};

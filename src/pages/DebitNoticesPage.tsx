import { SearchDebit } from "../components/SearchDebit";
import { TableDebit } from "../components/TableDebit";

export const DebitNoticesPage = () => {
  return (
    <div>
      <section className="flex justify-between items-center ">
        <header>
          <h2 className="text-xl font-bold">Gestor Aviso Débito</h2>
        </header>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 h-[42px]">
          Nuevo Aviso
        </button>
      </section>
      <section>
        <SearchDebit />
      </section>
      <section>
        <TableDebit />
      </section>
    </div>
  );
};

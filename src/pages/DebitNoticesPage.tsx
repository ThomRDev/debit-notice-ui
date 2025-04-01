import { SearchDebit } from "../components/SearchDebit";
import { TableDebit } from "../components/TableDebit";
import useModalStore from "../store/useModalStore.store";
import { NumGenerateApi } from "../config/apiNumGenerate";
import useTempNumberStore from "../store/TempNumberStore";
import { useNavigate } from "react-router";

export const DebitNoticesPage = () => {
  const { openModal } = useModalStore();

  const setTempNumber = useTempNumberStore((state) => state.setTempNumber);
  const navigate = useNavigate();

  const handleFetchNumber = async () => {
    try {
      const tempNumber = await NumGenerateApi.get();
      setTempNumber(tempNumber);
    } catch (error) {
      console.error("Error al generar el número temporal:", error);
  };
}

  return (
    <div>
      <section className="flex justify-between items-center ">
        <header>
          <h2 className="text-xl font-bold">Gestor Aviso Débito</h2>
        </header>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 h-[42px]"
          onClick={() => {
            handleFetchNumber();
            openModal("modal-new-debit-notice", (close) => (
              <div>
                <p>Este es el Modal 1</p>
                <button onClick={close}>Cerrar</button>
              </div>
            ));
            navigate('/gestion-comercial/debitNoticeCreate')
          }}
        >
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

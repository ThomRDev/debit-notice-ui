import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSearchStore } from "../store/useDebitNotices.store";

const Schemabusqueda = Yup.object().shape({
  numero_aviso: Yup.string().test(
    "numero_aviso",
    "(*) Ingresa al menos un criterio",
    function (value) {
      const { numero_sap, usuario_creador, cliente } = this.parent;
      return (
        Boolean(value?.trim()) ||
        Boolean(numero_sap?.trim()) ||
        Boolean(usuario_creador?.trim()) ||
        Boolean(cliente?.trim())
      );
    }
  ),
  numero_sap: Yup.string().test(
    "numero_sap",
    "(*) Ingresa al menos un criterio",
    function (value) {
      const { numero_aviso, usuario_creador, cliente } = this.parent;
      return (
        Boolean(value?.trim()) ||
        Boolean(numero_aviso?.trim()) ||
        Boolean(usuario_creador?.trim()) ||
        Boolean(cliente?.trim())
      );
    }
  ),
  usuario_creador: Yup.string().test(
    "usuario_creador",
    "(*) Ingresa al menos un criterio",
    function (value) {
      const { numero_aviso, numero_sap, cliente } = this.parent;
      return (
        Boolean(value?.trim()) ||
        Boolean(numero_aviso?.trim()) ||
        Boolean(numero_sap?.trim()) ||
        Boolean(cliente?.trim())
      );
    }
  ),
  cliente: Yup.string().test(
    "cliente",
    "(*) Ingresa al menos un criterio",
    function (value) {
      const { numero_aviso, numero_sap, usuario_creador } = this.parent;
      return (
        Boolean(value?.trim()) ||
        Boolean(numero_aviso?.trim()) ||
        Boolean(numero_sap?.trim()) ||
        Boolean(usuario_creador?.trim())
      );
    }
  ),
  fecha_servicio_desde: Yup.string(),
  fecha_servicio_hasta: Yup.string(),
  estado: Yup.string()
    .required("(*) Estado no válido")
    .oneOf(
      ["Todos", "Borrador", "Pendiente", "Migrado", "Anulado"],
      "(*) Estado no válido"
    ),
  moneda: Yup.string()
    .required("(*) La moneda no es válida")
    .oneOf(["Todas", "USD", "EUR"], "(*) La moneda no es válida"),
  importe_desde: Yup.number().min(0, "(*) No puede ser negativo"),
  importe_hasta: Yup.number().min(0, "(*) No puede ser negativo"),
});

export const SearchDebit = () => {
  const { searchParams, updateSearchParams, resetSearchParams } =
    useSearchStore();
  return (
    <div className="p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">Buscar Avisos</h2>
      <Formik
        initialValues={searchParams}
        validationSchema={Schemabusqueda}
        onSubmit={(valores) => {
          updateSearchParams(valores);
        }}
      >
        {({ resetForm }) => (
          <Form className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <label
                htmlFor="numero_aviso"
                className="block text-sm font-medium text-gray-700"
              >
                N° Aviso
              </label>
              <Field
                id="numero_aviso"
                name="numero_aviso"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 h-[42px]"
                placeholder="Buscar"
              />
              <ErrorMessage
                name="numero_aviso"
                component="span"
                className="text-red-600/70 text-[.7em] pl-2"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="estado"
                className="block text-sm font-medium text-gray-700"
              >
                Estado
              </label>
              <Field
                as="select"
                id="estado"
                name="estado"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 h-[42px]"
              >
                <option value="Todos">Todos</option>
                <option value="Borrador">Borrador</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Migrado">Migrado</option>
              </Field>
              <ErrorMessage
                name="estado"
                component="span"
                className="text-red-600/70 text-[.7em] pl-2"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="numero_sap"
                className="block text-sm font-medium text-gray-700"
              >
                N° SAP
              </label>
              <Field
                id="numero_sap"
                name="numero_sap"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 h-[42px]"
                placeholder="Buscar"
              />
              <ErrorMessage
                name="numero_sap"
                component="span"
                className="text-red-600/70 text-[.7em] pl-2"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="usuario_creador"
                className="block text-sm font-medium text-gray-700"
              >
                Usuario creador
              </label>
              <Field
                id="usuario_creador"
                name="usuario_creador"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 h-[42px]"
                placeholder="Buscar"
              />
              <ErrorMessage
                name="usuario_creador"
                component="span"
                className="text-red-600/70 text-[.7em] pl-2"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="fecha_servicio_desde"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha desde
              </label>
              <Field
                type="date"
                id="fecha_servicio_desde"
                name="fecha_servicio_desde"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 h-[42px]"
              />
              <ErrorMessage
                name="fecha_servicio_desde"
                component="span"
                className="text-red-600/70 text-[.7em] pl-2"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="fecha_servicio_hasta"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha hasta
              </label>
              <Field
                type="date"
                id="fecha_servicio_hasta"
                name="fecha_servicio_hasta"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 h-[42px]"
              />
              <ErrorMessage
                name="fecha_servicio_hasta"
                component="span"
                className="text-red-600/70 text-[.7em] pl-2"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="cliente"
                className="block text-sm font-medium text-gray-700"
              >
                Cliente
              </label>
              <Field
                id="cliente"
                name="cliente"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 h-[42px]"
                placeholder="Buscar cliente"
              />
              <ErrorMessage
                name="cliente"
                component="span"
                className="text-red-600/70 text-[.7em] pl-2"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="moneda"
                className="block text-sm font-medium text-gray-700"
              >
                Moneda
              </label>
              <Field
                as="select"
                id="moneda"
                name="moneda"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 h-[42px]"
              >
                <option value="Todas">Todas</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </Field>
              <ErrorMessage
                name="moneda"
                component="span"
                className="text-red-600/70 text-[.7em] pl-2"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="importe_desde"
                className="block text-sm font-medium text-gray-700"
              >
                Importe desde
              </label>
              <Field
                type="number"
                id="importe_desde"
                name="importe_desde"
                step="0.01"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 h-[42px]"
              />
              <ErrorMessage
                name="importe_desde"
                component="span"
                className="text-red-600/70 text-[.7em] pl-2"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="importe_hasta"
                className="block text-sm font-medium text-gray-700"
              >
                Importe hasta
              </label>
              <Field
                type="number"
                id="importe_hasta"
                name="importe_hasta"
                step="0.01"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 h-[42px]"
              />
              <ErrorMessage
                name="importe_hasta"
                component="span"
                className="text-red-600/70 text-[.7em] pl-2"
              />
            </div>

            <div className="col-span-1 flex justify-end space-x-3 mt-4 items-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 h-[42px]"
              >
                Buscar
              </button>
              <button
                type="button"
                onClick={() => {
                  resetSearchParams();
                  resetForm({
                    values: {
                      numero_aviso: "",
                      estado: "Todos",
                      numero_sap: "",
                      usuario_creador: "",
                      fecha_servicio_desde: "",
                      fecha_servicio_hasta: "",
                      moneda: "Todas",
                      importe_desde: "0.00",
                      importe_hasta: "0.00",
                      cliente: "",
                    },
                  });
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 h-[42px]"
              >
                Limpiar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useModalStore from "../store/useModalStore.store";

export const Modal = () => {
  const { modals, closeModal } = useModalStore();
  const [activeModals, setActiveModals] = useState<string[]>([]);
  const [closingModals, setClosingModals] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.overflow = modals.length > 0 ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modals]);

  useEffect(() => {
    setTimeout(() => {
      setActiveModals(modals.map(({ id }) => id));
    }, 10);
  }, [modals]);

  const handleClose = (id: string) => {
    setClosingModals((prev) => [...prev, id]);
    setTimeout(() => {
      closeModal(id);
      setClosingModals((prev) => prev.filter((modalId) => modalId !== id));
    }, 300);
  };

  return ReactDOM.createPortal(
    <>
      {modals.map(({ id, content }) => {
        const isClosing = closingModals.includes(id);
        const isActive = activeModals.includes(id);

        return (
          <div
            key={id}
            className={`modal-overlay ${isActive ? "fade-in" : "fade-out"}`}
          >
            <div
              className={`modal-content ${
                isClosing ? "slide-out" : "slide-in"
              }`}
            >
              {content(() => handleClose(id))}
            </div>
          </div>
        );
      })}
    </>,
    document.getElementById("portal-root") as HTMLElement
  );
};

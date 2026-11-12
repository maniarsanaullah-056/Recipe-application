import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import "../styles/Modal.css";

// Reusable popup: Escape, bahar click aur X button se band hota hai
function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    // Popup khula ho to peeche ka page scroll na ho
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  // Sirf overlay par click ho (popup ke andar nahi) to band karo
  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // createPortal: popup ko seedha <body> mein banata hai (neeche wajah dekho)
  return createPortal(
    <div className="modal-overlay" onMouseDown={handleOverlayMouseDown}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal__head">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" aria-label="Band karo" onClick={onClose}>
            <FiX />
          </button>
        </header>

        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
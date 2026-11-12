import "../styles/Message.css";

// Reusable message box: idle, empty aur error teeno states mein kaam aayega
function Message({ icon, title, text, actionLabel, onAction }) {
  return (
    <div className="message">
      <span className="message__icon">{icon}</span>

      <div>
        <h3 className="message__title">{title}</h3>
        {text && <p className="message__text">{text}</p>}

        {actionLabel && (
          <button className="message__btn" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default Message;
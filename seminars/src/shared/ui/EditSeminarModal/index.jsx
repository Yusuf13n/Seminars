import { useState, useEffect } from "react";
import { updateSeminar } from "../../../store/api";
import "./ui.scss";

const EditSeminarModal = ({ seminar, onClose, onUpdate }) => {

  const [title, setTitle] = useState(seminar.title);
  const [date, setDate] = useState(seminar.date);
  const [description, setDescription] = useState(seminar.description);
  const [time, setTime] = useState(seminar.time);
  const [isActive, setIsActive] = useState(false);

  // Плавное открытие модального окна
  useEffect(() => {
    setIsActive(true); // Устанавливаем isActive в true при монтировании компонента
  }, []);

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    try {
      // Отправляем обновленные данные на сервер
      await updateSeminar(seminar.id, { title, date, description, time });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Ошибка при обновлении семинара:", error);
    }
  };

  // Плавное закрытие модального окна
  const handleClose = () => {
    setIsActive(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`modal-overlay ${isActive ? "active" : ""}`}>
      <div className="modal">
        <h2>Редактирование семинара</h2>
        <form onSubmit={handleSubmit}>

          <label>
            Название:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <div className="date-time-group">
            <label>
              Дата:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label>
              Время:
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>

          <label>
            Описание:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div className="button-group">
            <button type="button" onClick={handleClose}>Отмена</button>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSeminarModal;

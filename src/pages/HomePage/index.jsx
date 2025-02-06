import { useEffect, useState } from "react";
import { fetchSeminars, deleteSeminar } from "../../store/api";
import EditSeminarModal from "../../shared/ui/EditSeminarModal";
import "./ui.scss";

export const SeminarList = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSeminar, setEditingSeminar] = useState(null);

  // Загрузка семинаров при монтировании компонента
  useEffect(() => {
    const loadSeminars = async () => {
      try {
        const data = await fetchSeminars(); // Запрашиваем данные с сервера
        setSeminars(data); // Обновляем состояние списка семинаров
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadSeminars();
  }, []);

  // Обработчик удаления семинара
  const handleDelete = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот семинар?")) {
      try {
        await deleteSeminar(id);
        setSeminars(seminars.filter((seminar) => seminar.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (seminar) => {
    setEditingSeminar(seminar); // Устанавливаем редактируемый семинар
  };

  // Обработчик обновления списка семинаров
  const handleUpdate = async () => {
    try {
      const data = await fetchSeminars(); // Запрашиваем обновленные данные с сервера
      setSeminars(data); // Обновляем состояние списка семинаров
    } catch (error) {
      console.error(error); // Обрабатываем ошибку
    }
  };


  return loading ? (
    <div>Загрузка...</div>
  ) : (
    <div className="seminar-list">
      <h1 className="seminar-title">Семинары</h1>
      <ul className="seminar-container">
        {seminars.map((seminar) => (
          <li key={seminar.id} className="seminar-card">
            <div className="seminar-info">
              <h2 className="seminar-card-title">{seminar.title}</h2>
              <p className="seminar-card-description">{seminar.description}</p>
              <p className="seminar-card-info">
                📅 {seminar.date} {seminar.time}
              </p>
            </div>

            <div className="seminar-card-buttons">
              <button className="seminar-btn" onClick={() => handleEdit(seminar)}>Edit</button>
              <button className="seminar-btn delete"onClick={() => handleDelete(seminar.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editingSeminar && (
        <EditSeminarModal seminar={editingSeminar} onClose={() => setEditingSeminar(null)} onUpdate={handleUpdate}/>
      )}
    </div>
  );
};

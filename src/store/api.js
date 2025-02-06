import axios from "axios";

const API_URL = "http://localhost:3001/seminars"; // Базовый URL для API

// Функция для загрузки списка семинаров
export const fetchSeminars = async () => {
  try {
    const response = await axios.get(API_URL); // GET-запрос к серверу
    return response.data; // Возвращаем данные
  } catch (error) {
    console.error("Ошибка при загрузке семинаров:", error);
  }
};

// Функция для удаления семинара
export const deleteSeminar = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`); // DELETE-запрос к серверу
  } catch (error) {
    console.error("Ошибка при удалении семинара:", error);
  }
};

// Функция для обновления семинара
export const updateSeminar = async (id, updatedSeminar) => {
  try {
    await axios.put(`${API_URL}/${id}`, updatedSeminar); // PUT-запрос к серверу
  } catch (error) {
    console.error("Ошибка при обновлении семинара:", error);
  }
};
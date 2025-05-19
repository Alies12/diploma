import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const api = {
  // GET-запросы
  async getInitialData() {
    try {
      console.log('Calling getInitialData...');
      const [newsResponse, servicesResponse, employeesResponse, scheduleResponse, parentsFeedbackResponse, newsCommentResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/news`),
        axios.get(`${API_BASE_URL}/service`),
        axios.get(`${API_BASE_URL}/employees`),
        axios.get(`${API_BASE_URL}/schedule`),
        axios.get(`${API_BASE_URL}/parents_feedback`),
        axios.get(`${API_BASE_URL}/news_comment`),
      ]);
      return {
        news: newsResponse.data,
        services: servicesResponse.data,
        employees: employeesResponse.data,
        schedule: scheduleResponse.data,
        parentsFeedback: parentsFeedbackResponse.data,
        newsComments: newsCommentResponse.data,
      };
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      throw error;
    }
  },

  async getServices() {
    try {
      console.log('Calling getServices...');
      const response = await axios.get(`${API_BASE_URL}/service`, { headers: { 'Cache-Control': 'no-cache' } });
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке услуг:', error);
      throw error;
    }
  },
  async getUserHistory(userId, token) {
    try {
      console.log('Calling getUserHistory...');
      const response = await fetch(`${API_BASE_URL}/user_history?id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при загрузке истории записей:', error.message);
      throw error;
    }
  },
  async getParents_feedback() {
    try {
      console.log('Calling getParents_feedback...');
      const response = await axios.get(`${API_BASE_URL}/parents_feedback`, { headers: { 'Cache-Control': 'no-cache' } });
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
      throw error;
    }
  },

  async getNewsComments() {
    try {
      console.log('Calling getNewsComments...');
      const response = await axios.get(`${API_BASE_URL}/news_comment`, { headers: { 'Cache-Control': 'no-cache' } });
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке комментариев:', error);
      throw error;
    }
  },

  async getPrograms() {
    try {
      console.log('Calling getPrograms...');
      const response = await axios.get(`${API_BASE_URL}/programs`, { headers: { 'Cache-Control': 'no-cache' } });
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке программ:', error);
      throw error;
    }
  },

  async getSchedule() {
    try {
      console.log('Calling getSchedule...');
      const response = await axios.get(`${API_BASE_URL}/schedule`, { headers: { 'Cache-Control': 'no-cache' } });
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке расписания:', error);
      throw error;
    }
  },

  async getContacts() {
    try {
      console.log('Calling getContacts...');
      const response = await axios.get(`${API_BASE_URL}/contacts`, { headers: { 'Cache-Control': 'no-cache' } });
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке контактов:', error);
      throw error;
    }
  },

  async postParentsFeedback(data) {
    try {
      console.log('Calling postParentsFeedback to URL:', `${API_BASE_URL}/parents_feedback`, 'with data:', data);
      const response = await axios.post(`${API_BASE_URL}/parents_feedback`, data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при добавлении отзыва:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  async postService(data) {
    try {
      console.log('Calling postService to URL:', `${API_BASE_URL}/service_subscribe`, 'with data:', data);
      const response = await axios.post(`${API_BASE_URL}/service_subscribe`, data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при добавлении услуги:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  async postPrograms(data) {
    try {
      console.log('Calling postPrograms to URL:', `${API_BASE_URL}/registration_trial_lesson`, 'with data:', data);
      const response = await axios.post(`${API_BASE_URL}/registration_trial_lesson`, data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при записи на программу:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
  async postContacts(data) {
    try {
      console.log('Calling postContacts to URL:', `${API_BASE_URL}/contacts`, 'with data:', data);
      const response = await axios.post(`${API_BASE_URL}/contacts`, data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  async postNewsComment(data) {
    try {
      console.log('Calling postNewsComment...', data);
      const response = await axios.post(`${API_BASE_URL}/news_comment`, data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
      throw error;
    }
  },
async postFeedback(data) {
  try {
    console.log('Calling postFeedback...', data);
    const response = await axios.post(`${API_BASE_URL}/feedback`, data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении сообщения:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
},

async postRegister(data) {
  try {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
  return response.data;
} catch (error) {
  console.error('Ошибка при добавлении сообщения:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
throw error;
}
},

// Вход
async postLogin (data)  {
  try {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
  return response.data;
} catch (error) {
  console.error('Ошибка при добавлении сообщения:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
throw error;
}
},

// Восстановление пароля
async postPasswordRecovery(data) {
  try {
  const response = await axios.post(`${API_BASE_URL}/auth/password-recovery`, data);
  return response.data;
} catch (error) {
  console.error('Ошибка при добавлении сообщения:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
throw error;
}
},
}
export default api;
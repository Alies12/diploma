const api = require('../src/api/api').default;
const axios = require('axios');

jest.mock('axios');

describe('тесты аутентификации', () => {
  beforeEach(() => {
    axios.post.mockReset();
    global.fetch = jest.fn().mockReset();
  });

  test('регистрация пользователя', async () => {
    axios.post.mockResolvedValue({ data: { id: '1' } });
    const userData = {
      username: 'тестовый пользователь',
      email: 'test@example.com',
      password: 'password123',
      phone: '1234567890',
    };
    const response = await api.postRegister(userData);
    expect(response).toEqual({ id: '1' });
  });

  test('вход пользователя', async () => {
    axios.post.mockResolvedValue({ data: { token: 'mock-token', user: { id: '1' } } });
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };
    const response = await api.postLogin(loginData);
    expect(response.token).toBe('mock-token');
    expect(response.user).toEqual({ id: '1' });
  });

  test('восстановление пароля', async () => {
    axios.post.mockResolvedValue({ data: { message: 'sent' } });
    const recoveryData = { email: 'test@example.com' };
    const response = await api.postPasswordRecovery(recoveryData);
    expect(response).toEqual({ message: 'sent' });
  });

  test('повторная регистрация с существующим email', async () => {
    axios.post.mockResolvedValueOnce({ data: { id: '1' } });
    axios.post.mockRejectedValueOnce(new Error('Conflict'));
    const userData = {
      username: 'тестовый пользователь',
      email: 'test@example.com',
      password: 'password123',
      phone: '1234567890',
    };
    await api.postRegister(userData);
    await expect(api.postRegister(userData)).rejects.toThrow('Conflict');
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/auth/register',
      userData
    );
  });

  test('запрос с истекшим токеном', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 401,
    });
    await expect(api.getUserHistory('1', 'expired_jwt_token')).rejects.toThrow('HTTP error! status: 401');
  });
});
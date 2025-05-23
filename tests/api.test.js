const api = require('../src/api/api').default;
const axios = require('axios');

jest.mock('axios');

describe('тесты api', () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    global.fetch = jest.fn().mockReset();
  });

  test('получение начальных данных', async () => {
    axios.get
      .mockImplementationOnce(() => Promise.resolve({ data: ['news1'] }))
      .mockImplementationOnce(() => Promise.resolve({ data: ['service1'] })) 
      .mockImplementationOnce(() => Promise.resolve({ data: ['employee1'] }))
      .mockImplementationOnce(() => Promise.resolve({ data: ['schedule1'] }))
      .mockImplementationOnce(() => Promise.resolve({ data: ['feedback1'] }))
      .mockImplementationOnce(() => Promise.resolve({ data: ['comment1'] }));

    const data = await api.getInitialData();
    expect(data.news).toEqual(['news1']);
    expect(data.services).toEqual(['service1']);
    expect(data.employees).toEqual(['employee1']);
    expect(data.schedule).toEqual(['schedule1']);
    expect(data.parentsFeedback).toEqual(['feedback1']);
    expect(data.newsComments).toEqual(['comment1']);
  });

  test('получение услуг', async () => {
    axios.get.mockResolvedValue({ data: ['service1'] });
    const data = await api.getServices();
    expect(data).toEqual(['service1']);
  });

  test('получение истории пользователя', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ history: ['record1'] }),
    });
    const data = await api.getUserHistory('1', 'test-token');
    expect(data).toEqual({ history: ['record1'] });
  });

  test('получение отзывов родителей', async () => {
    axios.get.mockResolvedValue({ data: ['feedback1'] });
    const data = await api.getParents_feedback();
    expect(data).toEqual(['feedback1']);
  });

  test('получение комментариев к новостям', async () => {
    axios.get.mockResolvedValue({ data: ['comment1'] });
    const data = await api.getNewsComments();
    expect(data).toEqual(['comment1']);
  });

  test('получение программ', async () => {
    axios.get.mockResolvedValue({ data: ['program1'] });
    const data = await api.getPrograms();
    expect(data).toEqual(['program1']);
  });

  test('получение расписания', async () => {
    axios.get.mockResolvedValue({ data: ['schedule1'] });
    const data = await api.getSchedule();
    expect(data).toEqual(['schedule1']);
  });

  test('получение контактов', async () => {
    axios.get.mockResolvedValue({ data: ['contact1'] });
    const data = await api.getContacts();
    expect(data).toEqual(['contact1']);
  });

  test('отправка отзыва родителей', async () => {
    axios.post.mockResolvedValue({ data: { id: '1' } });
    const response = await api.postParentsFeedback({ text: 'тестовый отзыв' });
    expect(response).toEqual({ id: '1' });
  });

  test('отправка услуги', async () => {
    axios.post.mockResolvedValue({ data: { id: '1' } });
    const response = await api.postService({ serviceId: '1' });
    expect(response).toEqual({ id: '1' });
  });

  test('отправка программы', async () => {
    axios.post.mockResolvedValue({ data: { id: '1' } });
    const response = await api.postPrograms({ programId: '1' });
    expect(response).toEqual({ id: '1' });
  });

  test('отправка контактов', async () => {
    axios.post.mockResolvedValue({ data: { id: '1' } });
    const response = await api.postContacts({ message: 'тестовое сообщение' });
    expect(response).toEqual({ id: '1' });
  });

  test('отправка комментария к новости', async () => {
    axios.post.mockResolvedValue({ data: { id: '1' } });
    const response = await api.postNewsComment({ comment: 'тестовый комментарий' });
    expect(response).toEqual({ id: '1' });
  });

  test('отправка обратной связи', async () => {
    axios.post.mockResolvedValue({ data: { id: '1' } });
    const response = await api.postFeedback({ text: 'тестовая обратная связь' });
    expect(response).toEqual({ id: '1' });
  });

  test('отправка отзыва с максимальной длиной текста', async () => {
    axios.post.mockResolvedValue({ data: { id: '1' } });
    const longText = 'a'.repeat(255);
    const response = await api.postParentsFeedback({ text: longText });
    expect(response).toEqual({ id: '1' });
  });

  test('отправка строки вместо числа в поле id', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 400,
    });
    await expect(api.getUserHistory('abc', 'test-token')).rejects.toThrow('HTTP error! status: 400');
  });
});
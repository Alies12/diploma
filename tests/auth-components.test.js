const { render, screen } = require('@testing-library/react');
const userEvent = require('@testing-library/user-event').default;
const { BrowserRouter } = require('react-router-dom');
const Auth = require('../src/pages/Auth.jsx').default;
const api = require('../src/api/api').default;

jest.mock('../src/api/api');

describe('тесты auth', () => {
  beforeEach(() => {
    api.postLogin.mockReset();
    api.postRegister.mockReset();
    api.postPasswordRecovery.mockReset();
  });

  test('форма входа', () => {
    console.log('тест: форма входа');
    render(<Auth />, { wrapper: BrowserRouter });
    const heading = screen.getByText(/вход в аккаунт/i);
    expect(heading).toBeInTheDocument();
    console.log('конец теста: форма входа');
  });

  test('поля формы входа', () => {
    console.log('тест: поля формы входа');
    render(<Auth />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText(/почта/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    console.log('конец теста: поля формы входа');
  });

  test('кнопка активна с полями', async () => {
    console.log('тест: кнопка активна с полями');
    render(<Auth />, { wrapper: BrowserRouter });
    const emailField = screen.getByLabelText(/почта/i);
    const passwordField = screen.getByLabelText(/пароль/i);
    const submitButton = screen.getByRole('button', { name: /войти/i });

    await userEvent.type(emailField, 'test@example.com');
    await userEvent.type(passwordField, 'password123');
    expect(submitButton).not.toBeDisabled();
    console.log('конец теста: кнопка активна с полями');
  });

  test('ошибка при входе', async () => {
    console.log('тест: ошибка при входе');
    api.postLogin.mockRejectedValue({
      response: { data: { message: 'произошла ошибка. пожалуйста, попробуйте снова' } },
    });
    render(<Auth />, { wrapper: BrowserRouter });

    const emailField = screen.getByLabelText(/почта/i);
    const passwordField = screen.getByLabelText(/пароль/i);
    const submitButton = screen.getByRole('button', { name: /войти/i });

    await userEvent.type(emailField, 'wrong@example.com');
    await userEvent.type(passwordField, 'wrongpass');
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/произошла ошибка. пожалуйста, попробуйте снова/i);
    expect(errorMessage).toBeInTheDocument();
    console.log('конец теста: ошибка при входе');
  });

  test('переход к регистрации', async () => {
    console.log('тест: переход к регистрации');
    render(<Auth />, { wrapper: BrowserRouter });
    const registerLink = screen.getByText(/нет аккаунта\? зарегистрироваться/i);
    await userEvent.click(registerLink);

    const heading = screen.getByText(/регистрация/i);
    expect(heading).toBeInTheDocument();
    console.log('конец теста: переход к регистрации');
  });

  test('переход к восстановлению пароля', async () => {
    console.log('тест: переход к восстановлению пароля');
    render(<Auth />, { wrapper: BrowserRouter });
    const recoveryLink = screen.getByText(/забыли пароль/i);
    await userEvent.click(recoveryLink);

    const heading = screen.getByText(/восстановление пароля/i);
    expect(heading).toBeInTheDocument();
    console.log('конец теста: переход к восстановлению пароля');
  });

  test('спиннер при отправке', async () => {
    console.log('тест: спиннер при отправке');
    api.postLogin.mockImplementation(() => new Promise(() => {}));
    render(<Auth />, { wrapper: BrowserRouter });

    const emailField = screen.getByLabelText(/почта/i);
    const passwordField = screen.getByLabelText(/пароль/i);
    const submitButton = screen.getByRole('button', { name: /войти/i });

    await userEvent.type(emailField, 'test@example.com');
    await userEvent.type(passwordField, 'password123');
    await userEvent.click(submitButton);

    const spinner = await screen.findByText(/обработка/i);
    expect(spinner).toBeInTheDocument();
    console.log('конец теста: спиннер при отправке');
  });

  test('ошибка почты', async () => {
    console.log('тест: ошибка почты');
    render(<Auth />, { wrapper: BrowserRouter });
    const emailField = screen.getByLabelText(/почта/i);
    const submitButton = screen.getByRole('button', { name: /войти/i });

    await userEvent.type(emailField, 'invalid-email');
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/введите корректный email/i);
    expect(errorMessage).toBeInTheDocument();
    console.log('конец теста: ошибка почты');
  });

  test('ошибка короткого пароля', async () => {
    console.log('тест: ошибка короткого пароля');
    render(<Auth />, { wrapper: BrowserRouter });
    const emailField = screen.getByLabelText(/почта/i);
    const passwordField = screen.getByLabelText(/пароль/i);
    const submitButton = screen.getByRole('button', { name: /войти/i });

    await userEvent.type(emailField, 'test@example.com');
    await userEvent.type(passwordField, 'short');
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/пароль должен быть не менее 6 символов/i);
    expect(errorMessage).toBeInTheDocument();
    console.log('конец теста: ошибка короткого пароля');
  });

  test('закрытие ошибки', async () => {
    console.log('тест: закрытие ошибки');
    api.postLogin.mockRejectedValue({
      response: { data: { message: 'произошла ошибка. пожалуйста, попробуйте снова' } },
    });
    render(<Auth />, { wrapper: BrowserRouter });

    const emailField = screen.getByLabelText(/почта/i);
    const passwordField = screen.getByLabelText(/пароль/i);
    const submitButton = screen.getByRole('button', { name: /войти/i });

    await userEvent.type(emailField, 'wrong@example.com');
    await userEvent.type(passwordField, 'wrongpass');
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/произошла ошибка. пожалуйста, попробуйте снова/i);
    expect(errorMessage).toBeInTheDocument();

    const closeButton = screen.getByText(/×/);
    await userEvent.click(closeButton);
    expect(errorMessage).not.toBeInTheDocument();
    console.log('конец теста: закрытие ошибки');
  });
});
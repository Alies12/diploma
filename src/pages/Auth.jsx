import FormTemplate from '../components/FormTemplate';

const Auth = () => {
  return (
    <section className="page-section auth-page">
      <div className="auth-forms">
        <FormTemplate
          title="Регистрация"
          fields={['name', 'email', 'password', 'phone']}
        />
        <FormTemplate
          title="Авторизация"
          fields={['email', 'password']}
        />
        <div className="password-recovery">
          <h3>Восстановление пароля</h3>
          <FormTemplate
            fields={['email']}
          />
        </div>
      </div>
    </section>
  );
};

export default Auth;
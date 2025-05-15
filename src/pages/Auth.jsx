import FormTemplate from "../components/FormTemplate";

const Auth = () => {
  return (
    <section className="page-section auth-page">
      <div className="auth-forms">
        <FormTemplate
          title="Регистрация"
          fields={["имя", "почта", "пароль", "телефон"]}
        />
        <FormTemplate title="Авторизация" fields={["почта", "пароль"]} />
        <div className="password-recovery">
          <FormTemplate title={["Восстановление пароля"]} fields={["почта"]} />
        </div>
      </div>
    </section>
  );
};

export default Auth;

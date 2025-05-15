export interface employeeСard {
  // выводимая карточка сотрудника
  fullname: string;
  photo: string; //url строка
  info: string;
}
export interface authorization {
  // отправляемая авторизация
  email: string;
  password: string;
}
export interface sendingFeedback {
  // отправляемые отзывы 
  fullname: string;
  email: string;
}
export interface user {
  // выводимые данные пользователя в личном кабинете
  username: string;
  email: string;
  phone: number;
}
export interface historyRecording {
  // выводимая история записей в личном кабинете
  date: Date;
  service: string;
  Status: string;
}
export interface passwordRecovery {
  // восстановление пароля
  email: string;
}
export interface feedback {
  // обратная связь
  name: string;
  email: string;
  message: string;
}
export interface commentNews {
  // комментирование новости
  name: string;
  email: string;
  comment: string;
}
export interface signUpForLesson {
  // запись на пробное занятие
  childName: string;
  parentNmae: string;
  phone: number;
  ageGroup: string;
}
export interface registrationForClasses {
  // запись на занятие (услугу)
  name: string;
  phone: number;
  email: string;
  service: string;
}
export interface classSchedule {
  // выводимое расписание занятий
  day: string;
  classes: string; // типо в понедельник 10:00 - Развивающие игры (3-5 лет) // 12:00 - Творческая мастерская (4-6 лет) во вторник 10:00 - Подготовка к школе (5-7 лет) и т д может лучше знаешь как это записать
}
export interface news {
  // выводимые новости
  name: string; // Новый курс рисования!
  text: string; // С 1 сентября запускаем курс акварельной живописи для детей от 5 лет
  data: Date; // 25.08.2023
}
export interface feedbackParents {
  // выводимые отзывы родителей 
  fullName: string; // Мария Иванова
  text: string; // "Отличный центр! Ребенок с удовольствием ходит на занятия!"
  data: Date; // 15.08.2023
}
export interface program {
  //выводимые программы
  nameProgram: string; // Раннее развитие (1-3 года)
  text: string; // Сенсорное развитие и мелкая моторика
}
export interface services {
  // выводимые услуги (не придумал какие услуги можно предлагать)
service: string; // пусть будет например проведения дня рождения 
text: string; // простой какой-то рассказ как проходит эта услуга 
}
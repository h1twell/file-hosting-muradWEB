<template>
  <div class="login-page">
    <form class="login-form" @submit.prevent="login" method="post">
      <header>
        <h2>Авторизация</h2>
      </header>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" required>
      </div>
      <div class="button-group">
        <button type="submit" class="login-button">Login</button>
        <router-link to="/registration" class="register-button">Registration</router-link>
      </div>
    </form>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const url = 'http://file-hosting.ru/api-file/authorization';
        const response = await axios.post(url, {
          email: this.email,
          password: this.password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Проверяем, что ответ успешный и содержит токен
        if (response.status === 200 && response.data.token) {
          // Сохраняем токен в localStorage
          localStorage.setItem('token', response.data.token);
          this.$router.push('/user-files');
          // Можно также сохранить другие данные пользователя, если они приходят в ответе
          // localStorage.setItem('user', JSON.stringify(response.data.user));

          // Обработка успешного входа, например, перенаправление пользователя

        } else {
          // Обработка случаев, когда токен не был получен
          console.error('Ошибка входа: Не удалось получить токен.');
        }
      } catch (error) {
        // Обработка ошибок при выполнении запроса
        this.errorMessage = 'Ошибка входа. Пожалуйста, проверьте свои учетные данные.';
        console.error('Ошибка входа:', error);
      }
    }
  },
};

</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #8A2BE2;
}

.login-form {
  width: 300px;
  background-color: #483D8B;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

h2 {
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  color: #fff;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  width: calc(50% - 5px); /* Разделение на две равные части с отступами */
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #483D8B;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #6A5ACD;
}
.register-button {
  display: inline-block;
  width: calc(50% - 5px);
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #483D8B;
  color: #fff;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;
}

/* Добавляем стили при наведении */
.register-button:hover {
  background-color: #6A5ACD;
}
</style>
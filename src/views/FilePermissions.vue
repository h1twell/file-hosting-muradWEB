<template>
  <home-view>
  <div class="user-file-page">
    <h2>Добавление прав на файл</h2>
    <form @submit.prevent="grantAccessToFile">
      <div class="form-group">
        <label for="email">Email пользователя:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <button type="submit" class="button-link">Добавить права</button>
      <div class="successmessage">{{ successMessage }}</div>
    </form>
  </div>
    </home-view>
</template>

<script>
import axios from 'axios';
import HomeView from "@/views/HomeView.vue";

export default {
  components: {HomeView},
  data() {
    return {
      email: '',
      fileId: null, // Инициализируем fileId как null
      successMessage: ''
    };
  },
  created() {
    // Установить fileId при создании компонента, например, из маршрута или props
    this.fileId = this.$route.params.fileId; // Пример получения fileId из маршрута

  },
  methods: {
    async grantAccessToFile() {
      try {
        const response = await axios.post(`http://file-hosting.ru/api-file/files/${this.fileId}/accesses`, {
          email: this.email
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Обрабатываем успешный ответ
        this.successMessage = 'Права доступа успешно добавлены.';
      } catch (error) {
        // Обрабатываем ошибку
        if (error.response.status === 403) {
          console.error('У вас нет прав на доступ к этому файлу.');
        } else {
          console.error('Ошибка при добавлении прав доступа к файлу:', error);
        }
      }
    }
  }
}
</script>

<style scoped>
.successmessage{
  color: white;
  text-align: center;
padding: 50px;
}
.user-file-page {
  padding: 20px;
  background-color: #8A2BE2;
  color: #fff;
  height: 100vh;
}

h2 {
  color: white;
  text-align: center;
  text-transform: uppercase;
}

.form-group {
  margin-bottom: 20px;
}

input[type="email"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #EE82EE;
  color: #fff;
}

button.button-link {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #483D8B;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.button-link:hover {
  background-color: #6A5ACD;
}
</style>

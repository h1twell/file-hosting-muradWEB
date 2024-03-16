
<template>
  <body>
  <header class="app-header">
    <div class="logo">

    </div>
    <nav class="navigation">
      <ul>

        <li><router-link to="/user-files">Мои файлы</router-link></li>
        <li><router-link to="/upload-files">Добавление файлов</router-link></li>
        <li><router-link to="/shared-files">Список файлов, к которым пользователь имеет доступ</router-link></li>
        <li><button @click="clearToken">Выход</button></li>
      </ul>
    </nav>
  </header>
  <main>
    <slot>

    </slot>
  </main>
  </body>

</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
  methods: {
    async clearToken() {
      try {
        // Отправляем запрос на API-путь для отчистки токена
        const response = await axios.get('http://file-hosting.ru/api-file/logout', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        localStorage.removeItem('token');
        // Обработка успешного ответа, если необходимо
        console.log('Токен успешно очищен');
        const router = useRouter();
        this.$router.push('/login');
        // Опционально выполните дополнительные действия после отчистки токена
      } catch (error) {
        // Обработка ошибки при выполнении запроса
        console.error('Ошибка при очистке токена:', error);
      }
    }
  }
}
</script>
<style scoped type="text/scss">

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #8A2BE2;
  color: #fff;
}

.logo img {
  width: 100px; /* Размер логотипа */
}
nav{
  width: 100%;
}
.navigation ul {
  display: flex;

  list-style: none;
  padding: 0;
  margin: 0;

}

.navigation ul li {
  display: inline;
  margin-right: 20px; /* Расстояние между пунктами меню */
}

.navigation ul li a {
  color: #fff;
  text-decoration: none;
}

.navigation ul li a:hover {
  text-decoration: underline;
}
.navigation ul li:last-child{
  margin-left: auto; /* Это поместит кнопку "Выход" в конец */
}
</style>
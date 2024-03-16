<template>
  <home-view>
  <div class="user-file-page">
    <h2>Файлы, к которым у вас есть доступ:</h2>
    <div class="file-list">
      <div class="file-item" v-for="file in allowedFiles" :key="file.id">
        <span>{{ file.name }} </span><!-- Замените на соответствующие поля файла -->
    <button type="button" @click="downloadFile(file.file_id,file.name)">Скачивание</button>
    <button @click="editFile(file.file_id)">Редактирование</button>
    <button @click="deleteFile(file.file_id)">Удаление</button>

    </div>
    </div>
  </div>
  </home-view>
</template>

<script>
import axios from 'axios';
import HomeView from "@/views/HomeView.vue";
import router from "@/router/index.js";
export default {
  components: {HomeView},
  data() {
    return {
      allowedFiles: [] // Инициализируем пустой массив для хранения файлов
    };
  },
  mounted() {
    // Выполняем запрос к API при загрузке компонента
    this.getAllowedFiles();
    this.fetchFiles();
  },
  created() {
    // Установить fileId при создании компонента, например, из маршрута или props
    this.fileId = this.$route.params.fileId; // Пример получения fileId из маршрута

  },
  methods: {
    async getAllowedFiles() {
      try {
        const response = await axios.get('http://file-hosting.ru/api-file/file/shared', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Присваиваем полученные файлы переменной allowedFiles
        this.allowedFiles = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке файлов:', error);
      }
    },
    async fetchFiles() {
      try {
        const response = await axios.get('http://file-hosting.ru/api-file/file/disk', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.files = response.data;
      } catch (error) {
        // Если ошибка авторизации (например, статус 401), перенаправляем пользователя на страницу логина
        if (error.response && error.response.status === 401) {
          router.push('/login'); // Здесь '/login' - путь к вашей странице входа
        } else {
          router.push('/login');
          console.error('Ошибка при получении файлов:', error);
        }
      }
    },
    async downloadFile(fileId, fileName) {
      try {

        // Выполняем GET-запрос для скачивания файла
        const response = await axios.get(`http://file-hosting.ru/api-file/files/${fileId}`, {
          responseType: 'blob', headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }, // Указываем, что ожидаемый тип данных - бинарные данные (файл)
        });

        // Создаем URL для скачивания файла
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Создаем ссылку для скачивания файла
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Указываем имя файла
        document.body.appendChild(link);

        // Начинаем скачивание файла
        link.click();

        // Очищаем ссылку после скачивания
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Ошибка при скачивании файла:', error);
      }
    },
    async deleteFile(fileId) {
      try {
        await axios.delete(`http://file-hosting.ru/api-file/files/${fileId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // После успешного удаления файла обновляем список файлов
        this.fetchFiles();
      } catch (error) {
        console.error('Ошибка при удалении файла:', error);
      }
    },
    editFile(fileId) {
      this.$router.push({ name: 'EditFile', params: { id: fileId } });
    },

  },
}


</script>
<style scoped>
.user-file-page {
  padding: 20px;
  background-color: #8A2BE2;
  color: #fff;
  height: 90vh;
}

h2 {
  color: White;
  text-align: center;
  text-transform: uppercase;
}

.file-list {
  margin-top: 20px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
  background-color: #483D8B;
  border-radius: 5px;
  margin-bottom: 10px;
}

.file-item span {
  flex: 1;
}
.button-link {
  display: inline-block;
  padding: 10px;
  background-color: #483D8B;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

}

/* Применяем стили при наведении курсора */
.button-link:hover {
  background-color: #6A5ACD;
}

</style>
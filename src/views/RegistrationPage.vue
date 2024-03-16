<template>
  <div class="register-page">
    <form class="register-form" @submit.prevent="signUp" method="post">
      <header>
        <h2>Registration</h2>
      </header>
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" id="first_name" v-model="firstName" placeholder="Enter your first name" required>
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" v-model="lastName" placeholder="Enter your last name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" required>
      </div>
      <div class="button-group">
        <button type="submit" class="register-button">Register</button>
        <router-link to="/login" class="login-button">Back to Login</router-link>
      </div>
    </form>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async signUp() {
      try {
        const url = 'http://file-hosting.ru/api-file/registration';
        const response = await axios.post(url, {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 201 && response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.$router.push('/user-files');
        } else {
          console.error('Registration error: Unable to obtain token.');
        }
      } catch (error) {
        this.errorMessage = 'Registration error. Please try again.';
        console.error('Registration error:', error);
      }
    }
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #8A2BE2;
}

.register-form {
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

input[type="text"],
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
  width: calc(50% - 5px);
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

.login-button {
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

.login-button:hover {
  background-color: #6A5ACD;
}
</style>
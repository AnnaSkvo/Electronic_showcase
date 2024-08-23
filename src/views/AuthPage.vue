<template>
  <div class="auth">
    <div class="auth__logo">
      <IconComponent name="IconLogo" />
    </div>
    <form @submit.prevent="getAuthorize()" class="auth__form">
      <div class="auth__field">
        <p>Почта</p>
        <input v-model="email" type="email" @blur="isEmailTouched = true" :class="{ error: isEmailError }"
          class="auth__input">
        <div class="auth__err" v-if="isEmailError">
          Заполено некорректно
        </div>
      </div>
      <div class="auth__field">
        <p>Пароль</p>
        <input type="password" v-model="password" @blur="isPasswordTouched = true" class="auth__input" />
        <div class="auth__err" v-if="isPasswordError">
          Заполено некорректно
        </div>
      </div>
      <button :disabled="!isEmailValid || !isPasswordValid" class="auth__btn" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>

import IconComponent from '../icons/IconComponent.vue'

const emailCheckRegex = /^^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default {
  name: 'AuthPage',
  data() {
    return {
      email: "",
      password: "",
      isEmailTouched: false,
      isPasswordTouched: false,
    };
  },
  components: {
    IconComponent,
  },
  computed: {
    // Проверка на валидность email
    isEmailValid() {
      return emailCheckRegex.test(this.email);
    },

    // Проверка на валидность пароля
    isPasswordValid() {
      return this.password
    },

    // Условие ошибки email
    isEmailError() {
      return !this.isEmailValid && this.isEmailTouched;
    },

    // Условие ошибки пароля
    isPasswordError() {
      return !this.isPasswordValid && this.isPasswordTouched;
    }
  },
  methods: {
    // Авторизация и переход на главную
    getAuthorize() {
      localStorage.setItem("token", this.email + this.password);
      this.$router.replace({ name: "home" });
    }
  },
}
</script>

<style scoped>
.auth {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth__logo {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

.auth__input {
  border-radius: 10px;
  border: 1px solid #5e5f5f;
  padding: 10px 24px;
  margin-bottom: 20px;
}

.auth__field {
  position: relative;
}

.auth__err {
  position: absolute;
  bottom: 0;
  font-size: 12px;
  color: brown;
  -webkit-animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

.auth__btn {
  width: 100%;
  background: #5e5f5f;
  color: #fff;
  align-items: center;
  padding: 10px 24px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 18px;
}

.auth__btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.auth__btn:hover {
  background: gray;
}

.auth__btn:disabled:hover {
  background: #5e5f5f;
  opacity: 0.5;
  cursor: default;
}
</style>
<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";

import type { ValidateErrorEntity } from "@/core/types/form.type";
import { scrollIntoView } from "@/core/utils/scroll.util";

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

const loginForm = reactive<LoginForm>({
  username: "",
  password: "",
  remember: false,
});

const loginError = ref<string>("");

const onFinish = async (values: LoginForm) => {
  try {
    // Mock API call
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.username === "admin" && values.password === "admin") {
          resolve(true);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });

    // Success case
    loginError.value = "";
    console.log("Success:", values);
  } catch {
    loginError.value = "Invalid username or password";
    scrollIntoView(document.querySelector(".login-error"));
  }
};

const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
  // Scroll to the first error field
  if (errorInfo.errorFields.length > 0) {
    const firstErrorField = errorInfo.errorFields[0].name[0];
    scrollIntoView(document.querySelector(`#basic_${firstErrorField}`));
  }
};
</script>

<template>
  <div class="login-container">
    <a-card class="login-card">
      <a-typography-title class="title">Sign in</a-typography-title>
      <a-form :model="loginForm" name="basic" autocomplete="on" @finish="onFinish" @finishFailed="onFinishFailed">
        <div v-if="loginError" class="login-error">
          <a-alert type="error" :message="loginError" banner />
        </div>

        <div class="login-input">
          <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="loginForm.username" placeholder="Username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="loginForm.password" placeholder="Password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
        </div>

        <div class="options-row">
          <a-form-item name="remember" class="remember-item">
            <a-checkbox v-model:checked="loginForm.remember">Remember me</a-checkbox>
          </a-form-item>

          <a-button type="link" class="forgot-password-btn">Forgot your password?</a-button>
        </div>

        <div class="sign-in-btn-container">
          <a-form-item class="sign-in-item">
            <a-button class="sign-in-btn" type="primary" html-type="submit">SIGN IN</a-button>
          </a-form-item>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
$sign-in-max-width: 400px;

%width-limit {
  width: 100%;
  max-width: $sign-in-max-width;
  margin: 0 auto;
}

%full-width {
  width: 100%;
}

@mixin center-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  @include center-flex;
  min-height: 100dvh;
}

.login-card {
  @extend %width-limit;
  max-width: calc(#{$sign-in-max-width} + 300px);
  margin-inline: 20px;
  padding-block: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  .ant-alert {
    margin: 0 auto 24px;
  }

  .title {
    font-weight: var(--font-weight-bold);
    text-align: center;
    margin-bottom: 30px;
  }

  .login-error,
  .login-input,
  .options-row,
  .sign-in-btn-container {
    @extend %width-limit;
  }

  .login-input {
    @include center-flex;
    flex-direction: column;

    :deep(.ant-form-item) {
      @extend %full-width;
      margin-bottom: 24px;
    }
    :deep(.ant-input) {
      height: 40px;
    }
  }

  .options-row {
    @include center-flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .remember-item {
      margin-bottom: 0;
    }
    .forgot-password-btn {
      font-size: var(--font-size-sm);
      padding: 0;
    }
  }

  .sign-in-btn-container {
    .sign-in-item {
      margin-bottom: 0;
      width: 100%;

      .sign-in-btn {
        width: 100%;
        height: 40px;
        border-radius: 20px;
        font-weight: var(--font-weight-semibold);
      }
    }
  }
}
</style>

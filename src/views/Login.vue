<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";

import type { ValidateErrorEntity } from "@/interfaces/form";

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

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
  // Scroll to the first error field
  if (errorInfo.errorFields.length > 0) {
    const firstErrorField = errorInfo.errorFields[0].name[0];
    const errorElement = document.querySelector(`#basic_${firstErrorField}`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
};
</script>

<template>
  <div class="login-container">
    <a-card class="login-card">
      <a-typography-title class="title">Sign in</a-typography-title>
      <a-form :model="loginForm" name="basic" autocomplete="on" @finish="onFinish" @finishFailed="onFinishFailed">
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

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;

  .login-card {
    width: 100%;
    max-width: calc($sign-in-max-width + 300px);
    margin-inline: 20px;
    padding-block: 40px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-sizing: border-box;

    .title {
      font-weight: var(--font-weight-bold);
      text-align: center;
      width: 100%;
      margin-bottom: 30px;
    }

    .login-input {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: $sign-in-max-width;
      margin: 0 auto;

      :deep(.ant-form-item) {
        width: 100%;
        margin-bottom: 24px;
      }

      :deep(.ant-input) {
        height: 40px;
      }
    }

    .options-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: $sign-in-max-width;
      margin: 0 auto 24px;

      .remember-item {
        margin-bottom: 0;
      }

      .forgot-password-btn {
        font-size: var(--font-size-sm);
        padding: 0;
      }
    }

    .sign-in-btn-container {
      width: 100%;
      max-width: $sign-in-max-width;
      margin: 0 auto;

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
}
</style>

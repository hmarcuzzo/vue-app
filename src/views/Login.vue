<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";

import { settingsConfig } from "@/core/config/settings.config";
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
const isLoading = ref<boolean>(false);

const onFinish = async (values: LoginForm) => {
  isLoading.value = true;
  try {
    const params = new URLSearchParams();
    params.append("username", values.username);
    params.append("password", values.password);

    const response = await fetch(`${settingsConfig.apiBaseUrl}/auth-service/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      loginError.value = "Invalid username or password";
      return;
    }

    const { token } = await response.json();
    const storage = values.remember ? localStorage : sessionStorage;
    storage.setItem("auth_token", token);

    console.log("Success:", token);
  } catch (err) {
    loginError.value =
      err instanceof TypeError ? "Network error—please try again later." : "Something went wrong. Please try again.";
  } finally {
    if (loginError.value) scrollIntoView(document.querySelector(".login-error"));

    isLoading.value = false;
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
            <a-button class="sign-in-btn" type="primary" html-type="submit" :loading="isLoading" shape="round">
              SIGN IN
            </a-button>
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
        font-weight: var(--font-weight-semibold);
      }
    }
  }
}
</style>

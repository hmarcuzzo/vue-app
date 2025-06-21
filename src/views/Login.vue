<script setup lang="ts">
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import { nextTick, reactive, ref, useTemplateRef, watch } from "vue";
import { useRouter } from "vue-router";

import { useAuth } from "@/composables/useAuth";
import { RoutesName } from "@/core/constants/enums/routes.enum";
import type { LoginForm, ValidateErrorEntity } from "@/core/interfaces/loginForm.interface";
import { DEFAULT_SCROLL_OPTIONS, scrollIntoView } from "@/core/utils/dom.util";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();
const authStore = useAuthStore();

const loginForm = reactive<LoginForm>({
  username: "",
  password: "",
  remember: false,
});

const isLoading = ref<boolean>(false);
const { error: authError, login } = useAuth();

const errorContainer = useTemplateRef("error-container");
watch(authError, async (newError) => {
  if (newError) {
    // Ensure the DOM has updated and the element is rendered
    await nextTick();
    if (errorContainer.value) {
      errorContainer.value.scrollIntoView(DEFAULT_SCROLL_OPTIONS);
    }
  }
});

const onFinish = async (values: LoginForm) => {
  isLoading.value = true;
  if (authError.value) authError.value = "";

  try {
    const data = (await login(values.username, values.password, values.remember)).data;

    authStore.setAuthentication({ token: data.access_token });
  } finally {
    await router.push({ name: RoutesName.HOME });
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
        <div v-if="authError" class="login-error" ref="error-container">
          <a-alert type="error" :message="authError" banner />
        </div>

        <div class="login-input">
          <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="loginForm.username" placeholder="Username">
              <template #prefix>
                <UserIcon class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="loginForm.password" placeholder="Password">
              <template #prefix>
                <LockClosedIcon class="site-form-item-icon" />
              </template>
              <template #iconRender="v">
                <EyeIcon v-if="v" />
                <EyeSlashIcon v-else />
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

@mixin center-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  @include center-flex;
  height: 100%;
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
      width: 100%;
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

.site-form-item-icon,
.ant-input-password-icon {
  width: var(--font-size-xl);
  height: var(--font-size-xl);
}

.ant-input-password-icon {
  color: color-mix(in srgb, var(--color-grey) 30%, white 70%);
  &:hover,
  &:focus {
    color: var(--color-grey);
    cursor: pointer;
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
}

:root[data-theme="dark"] .ant-input-password-icon {
  &:hover,
  &:focus {
    color: var(--color-text-light);
  }
}
</style>

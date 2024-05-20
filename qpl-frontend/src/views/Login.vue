<template>
  <div class="login-container">
    <div class="forms-container">
      <div class="signin-signup">
        <a-form :model="formState" class="sign-in-form" @finish="onFinish" @finishFailed="onFinishFailed">
          <h2 class="title">登 录</h2>
          <a-form-item name="phone" class="input-field" :rules="formRules.phone">
            <a-input v-model:value="formState.phone" placeholder="手机号码">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="verifycode" :rules="formRules.verifycode">
            <a-input v-model:value="formState.verifycode" placeholder="验证码">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item style="margin-top: 10px;">
            <a-button html-type="submit" type="primary" shape="round" size="large">登 录</a-button>
            <a-button html-type="button" style="margin: 0 8px" shape="round" size="large" :disabled="disabled"
              @click="getVerifyCode()">获取验证码</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>Generate a poster?</h3>
          <p>
            Low-code editors can implement,
            Please sign in to the system and use the template.
          </p>
          <!-- <a-button shape="round" size="large" @click="toggle('sign-up')">注 册</a-button> -->
        </div>
        <img src="" class="image" alt="" />
      </div>

      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p>
          <button @click="toggle('sign-in')">
            Sign in
          </button>
        </div>
        <img src="" class="image" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { reactive, computed, ref, nextTick } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { Util } from '@/utils/util';
interface FormState {
  username?: string;
  phone: string;
  password?: string;
  verifycode: string;
  remember?: boolean;
}
const formState = reactive<FormState>({
  username: '',
  phone: '',
  password: '',
  verifycode: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};
const getVerifyCode = () => {

}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  console.log(formState.phone)
  return !Util.isMobile(formState.phone, true);
});
const formRules = reactive({
  phone: [{ required: true, message: '请输入手机号码!' }, {
    pattern: /^((13[0-9])|(14[5-9])|(15[0-3,5-9])|(16[2,5-7])|(17[0-8])|(18[0-9])|(19[0-3])|(19[5-9]))\d{8}$/,
    message: ' 手机号格式错误！'
  }],
  verifycode: [{ required: true, message: '请输入四位验证码!' }, {
    pattern: /^\d{4}$/,
    message: ' 格式错误！'
  }]
})

const toggle = (type: string) => {
  const container = document.querySelector(".login-container");
  console.log(container)
  nextTick(() => {
    if (container) {
      if (type === 'sign-up') {
        container.classList.add("sign-up-mode");
      } else {
        container.classList.remove("sign-up-mode");
      }
    }
  });
}
</script>
<style lang='scss' scoped>
.login-container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;

  .sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 52%;
  }

  .sign-up-mode {

    .left-panel .content,
    .left-panel .image {
      transform: translateX(-800px);
    }

    .signin-signup {
      left: 25%;
    }

    .sign-up-form {
      opacity: 1;
      z-index: 2;
    }

    .sign-in-form {
      opacity: 0;
      z-index: 1;
    }

    .right-panel .image,
    .right-panel .content {
      transform: translateX(0%);
    }

    .left-panel {
      pointer-events: none;
    }

    .right-panel {
      pointer-events: all;
    }
  }
}

.login-container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .signin-signup {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 50%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;


    .title {
      font-size: 2.2rem;
      color: #444;
      text-align: center;
      margin-bottom: 10px;
    }

    :deep(.ant-form) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0rem 5rem;
      transition: all 0.2s 0.7s;
      overflow: hidden;
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    :deep(.ant-input-affix-wrapper) {
      width: 380px;
      background-color: #f0f0f0;
      height: 55px;
      border-color: none;
      border-radius: 55px;
    }

    :deep(.ant-input) {
      background-color: #f0f0f0;
      outline: none;
      border: none;
      line-height: 1;
      font-weight: 600;
      font-size: 1.1rem;
      color: #333;
    }

    :deep(.ant-form-item-explain-error) {
      margin-left: 36px;
    }

    :deep(.ant-input-prefix) {
      width: 36px;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        text-align: center;
        // width: 36px;
        line-height: 55px;
        color: #acacac;
        transition: 0.5s;
        font-size: 1.1rem;
      }
    }

    :deep(.ant-input:placeholder-shown) {
      font-weight: 500;
      color: #aaa;
    }
  }
}


.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;

  .content {
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
  }

  p {
    font-size: 0.95rem;
    padding: 0.7rem 0;
  }
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}
</style>

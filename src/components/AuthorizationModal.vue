<template>
  <md-dialog-content>
    <div
      class="auth-modal"
      :class="[classObject]"
    >
      <md-button
        class="md-icon-button md-raised auth-modal__pos-close"
        @click="closeModal()"
      >
        <md-icon>close</md-icon>
      </md-button>
      <div class="auth-modal__wrapper">
        <div class="auth-modal__forgot-password">
          <div class="auth-modal__holder">
            <h2 class="auth-modal__title text-center mar-b-3">{{$t('auth.resetPassword')}}</h2>
          </div>
        </div>
        <div class="auth-modal__sign-in">
          <div class="auth-modal__holder">
            <h2 class="auth-modal__title text-center mar-b-3">{{$t('auth.signIn')}}</h2>
            <p
              class="auth-modal__text_small error mar-b-1"
              v-if="loginError"
            >{{$t('auth.loginError')}}
            </p>
            <form
              novalidate
              @submit.prevent="validateSignIn()"
            >
              <div class="md-layout">
                <div class="md-layout-item md-size-12">
                  <md-field :class="getValidationSignInClass('username')">
                    <label>{{$t('auth.emailAddress')}}*</label>
                    <md-input
                      name="email"
                      v-model="signInData.username"
                    ></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.signInData.username.required"
                    >
                      {{$t('auth.emailAddress')}} {{$t('auth.isRequired')}}
                    </span>
                    <span
                      class="md-error"
                      v-else-if="!$v.signInData.username.email"
                    >
                      {{$t('auth.invalid')}} {{$t('auth.emailAddress')}}
                    </span>
                  </md-field>
                  <md-field :class="getValidationSignInClass('password')">
                    <label>{{$t('auth.password')}}*</label>
                    <md-input
                      type="password"
                      v-model="signInData.password"
                    ></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.signInData.password.required"
                    >
                      {{$t('auth.password')}} {{$t('auth.isRequired')}}
                    </span>
                    <span
                      class="md-error"
                      v-else-if="!$v.signInData.password.minlength"
                    >
                      {{$t('auth.invalid')}} {{$t('auth.password')}}
                    </span>
                  </md-field>
                </div>
              </div>
              <div @click="onClickAnalytic('Login')">
                <md-button
                  type="submit"
                  class="radius-block radius-block_gray-btn radius-block_full-size mar-b-1"
                >
                  {{$t('auth.signIn')}}
                </md-button>
              </div>
              <div class="auth-modal__middle-line mar-b-1">
                <b class="auth-modal__middle-line-text">{{$t('auth.newHere')}}</b>
              </div>
              <div>
                <md-button
                  class="radius-block radius-block_full-size mar-b-2"
                  @click="signUp()"
                >
                  {{$t('auth.joinNow')}}
                </md-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </md-dialog-content>
</template>

<script>
import { mapActions } from 'vuex';
import {
  required,
  email,
  minLength,
} from 'vuelidate/lib/validators';
import axios from 'axios';
import authRequestMixin from '../mixins/authRequestMixin';

export default {
  name: 'DialogCustom',
  mixins: [authRequestMixin],
  // TODO: keep in mind
  props: {
    loginType: {
      type: String,
    },
  },
  data: () => ({
    classObject: '',
    loginError: false,
    isFormVisible: true,
    signInData: {
      username: null,
      password: null,
    },
  }),
  validations: {
    signInData: {
      username: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  created() {
    this.classObject = 'auth-modal_show-sign-in';
    this.isFormVisible = true;
  },
  methods: {
    ...mapActions(['updateAuth']),
    closeModal() {
      this.$emit('changeModalState', false);
      this.clearSignInForm();
    },
    changeForm(name) {
      this.classObject = `auth-modal_show-${name}`;
      document.querySelector('.auth-modal__sign-up').scrollTo(0, 0);
    },
    validateSignIn() {
      this.$v.signInData.$touch();

      if (!this.$v.signInData.$invalid) {
        this.signIn();
      }
    },
    signUp() {
      this.$router.push('/checkout/user-data');
    },
    async signIn(data) {
      if (data) {
        Object.assign(this.signInData, data);
      }

      let loginResponse = '';

      try {
        loginResponse = await axios
          .post('http://77.245.20.254/store-api/v3/account/login',
            this.signInData,
            {
              headers: {
                'sw-access-key': 'SWSCAUPEWFJVU0FVC20WCNDLUG',
                'sw-context-token': localStorage.getItem('contextToken'),
              },
            });
      } catch (e) {
        this.loginError = true;
        this.errorHandler('On post signIn', e);
      }

      if (loginResponse && loginResponse.data) {
        localStorage.setItem('contextToken', loginResponse.data.contextToken);
        localStorage.setItem('isUserAuthorized', true);
        if (this.$route.path === '/basket') {
          this.$router.push('/checkout');
        }
      }
      this.closeModal();
    },
    getValidationSignInClass(fieldName) {
      const field = this.$v.signInData[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }

      return false;
    },
    clearSignInForm() {
      this.$v.$reset();
      this.signInData.email = null;
      this.signInData.password = null;
    },
    onClickAnalytic(label) {
      this.$gtag.event('Account', {
        event_category: 'Button',
        event_label: label,
        value: 1,
      });
    },
  },
};
</script>

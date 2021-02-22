<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="header__content">
            <div class="header__logo">
              <router-link to="/" class="logo md-layout-item">
                <img src="../assets/logotemanpasar.png" alt="temanpasar" class="logo__img" />
              </router-link>
            </div>

            <span class="header__tagline"
              ><b>{{ siteName }}</b> – {{ siteName }} <br />{{ siteDescription }}</span
            >
          </div>
        </div>
        <div class="col-2" v-if="isUserAuthorized">
          <router-link to="/basket" tag="button">
            <button class="header__cart" v-if="needToShowBasket">
              <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                <circle
                  cx="176"
                  cy="416"
                  r="16"
                  style="
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <circle
                  cx="400"
                  cy="416"
                  r="16"
                  style="
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <polyline
                  points="48 80 112 80 160 352 416 352"
                  style="
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <path
                  d="M160,288H409.44a8,8,0,0,0,7.85-6.43l28.8-144a8,8,0,0,0-7.85-9.57H128"
                  style="
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
              </svg>
              <span>Keranjang</span>
            </button>
          </router-link>
        </div>
        <div class="col-2" v-if="isUserAuthorized">
          <router-link to="/profile" tag="button">
            <button class="header__cart">
              <img src="../assets/svg-icons/profile-user.svg" alt="signIn icon" />
              <span>Akun</span>
            </button>
          </router-link>
        </div>
        <div class="col-2" v-if="!isUserAuthorized">
          <button @click="onRegisterButtonClick()" href="#" class="header__cart">
            <img src="../assets/svg-icons/profile-user.svg" alt="signIn icon" />
            <span>Daftar</span>
          </button>
        </div>
        <div class="col-2" v-if="!isUserAuthorized">
          <button @click="onLoginButtonClick()" class="header__cart">
            <img src="../assets/svg-icons/sign-in-alt-solid.svg" alt="signIn icon" />
            <span>Masuk</span>
          </button>
        </div>
      </div>
    </div>
    <vue-final-modal
      :click-to-close="false"
      v-model="isModalDaftarVisible"
      classes="modal-container"
      content-class="modal-content"
    >
      <Loading :active.sync="isLoading" :is-full-page="true" loader="dots" color="blue"></Loading>
      <button class="header__close" @click="isModalDaftarVisible = false">
        <img src="../assets/svg-icons/error.svg" alt="Close icon" />
      </button>
      <span class="modal__title"> Daftar</span>
      <form @submit.prevent="validateFormRegister()">
        <div class="modal__content">
          <label ref="modalLabel" id="modal-p"></label>
          <div class="container-input">
            <div class="user-box">
              <input v-model="customer.nama" type="text" name="input-firstname" alt="input-firstname" required />
              <label>Nama</label>
              <span class="md-error" v-if="!$v.customer.nama.required">
                Nama tidak boleh kosong
              </span>
              <span class="md-error" v-else-if="!$v.customer.nama.minLength">
                Nama tidak boleh kosong
              </span>
            </div>

            <div class="user-box">
              <input v-model="customer.email" type="email" name="input-email" alt="input-email" required />
              <label>Email</label>
              <span class="md-error" v-if="!$v.customer.email.required">
                Alamat email tidak boleh kosong
              </span>
              <span class="md-error" v-else-if="!$v.customer.email.email">
                Format email salah
              </span>
            </div>
            <div class="user-box">
              <input v-model="customer.nomor_hp" type="number" name="input-email" alt="input-email" required />
              <label>Nomor Handphone</label>
              <span class="md-error" v-if="!$v.customer.nomor_hp.required">
                Nomor handphone tidak boleh kosong
              </span>
              <span class="md-error" v-else-if="!$v.customer.nomor_hp.minLength">
                Nomor handphone minimal 12 angka
              </span>
            </div>
            <div class="user-box">
              <input v-model="customer.password" type="password" name="input-secret" alt="input-secret" required />
              <label>Password</label>
              <span class="md-error" v-if="!$v.customer.password.required">
                Password tidak boleh kosong
              </span>
              <span class="md-error" v-else-if="!$v.customer.password.minLength">
                Password minimal 8 Karakter
              </span>
            </div>
            <div class="user-box">
              <input
                v-model="customer.passwordConfirm"
                type="password"
                name="input-secret"
                alt="input-secret"
                required
              />
              <label>Confirm Password</label>
              <span class="md-error" v-if="!$v.customer.passwordConfirm.required">
                Masukan konfirmasi password
              </span>
              <span class="md-error" v-else-if="!$v.customer.passwordConfirm.sameAsPassword">
                Password tidak sama
              </span>
            </div>
          </div>
          <div class="modal__action">
            <div class="button_base">
              <div></div>
              <div @click.prevent="validateFormRegister()">Daftar</div>
            </div>
          </div>
        </div>
      </form>
    </vue-final-modal>

    <vue-final-modal
      :click-to-close="false"
      v-model="isModalLoginVisible"
      classes="modal-container"
      content-class="modal-content"
    >
      <Loading :active.sync="isLoading" :is-full-page="true" loader="dots" color="blue"></Loading>
      <button class="header__close" @click="closeModalLoginFlag()">
        <img src="../assets/svg-icons/error.svg" alt="Close icon" />
      </button>
      <span class="modal__title">Masuk</span>
      <form @submit.prevent="validateFormLogin()">
        <div class="modal__content">
          <label ref="modalLabel" id="modal-p"></label>
          <div class="container-input">
            <div class="user-box">
              <input v-model="customerLogin.email" type="email" name="input-email" alt="input-email" required />
              <label>Email</label>
              <span class="md-error" v-if="!$v.customerLogin.email.required">
                Email tidak boleh kosong
              </span>
              <span class="md-error" v-else-if="!$v.customerLogin.email.email">
                Format email salah
              </span>
            </div>
            <div class="user-box">
              <input v-model="customerLogin.password" type="password" name="input-secret" alt="input-secret" required />
              <label>Password</label>
            </div>
          </div>
          <div class="modal__action" @click.prevent="validateFormLogin()">
            <div class="button_base">
              <div></div>
              <div>Masuk</div>
            </div>
          </div>
        </div>
      </form>
    </vue-final-modal>
  </header>
</template>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");
.container-input {
  margin-top: 10px;
}
label {
  color: white;
}
/* ==== Validation CSS ==== */
input:required {
  box-shadow: none;
}
/* ==== Modal CSS ==== */
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 95%;
  width: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background: #f0f0f0;
  webkit-box-shadow: 15px 15px 30px 0px rgb(0 0 0 / 7%), -15px -15px 30px 0px rgb(255 255 255 / 80%);
  box-shadow: 15px 15px 30px 0px rgb(0 0 0 / 7%), -15px -15px 30px 0px rgb(255 255 255 / 80%);
}
::v-deep .modal__title {
  margin: 0 2rem 0 0;
  font-size: 2rem;
  font-weight: 700;
  color: black;
}
::v-deep .modal__content {
  flex-grow: 1;
  overflow-y: auto;
  color: black;
}
::v-deep .modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
::v-deep .modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
/* ==== Input CSS ==== */
.user-box {
  position: relative;
  margin-bottom: 1rem;
}
.user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #000;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
}
.user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: rgb(143, 143, 143);
  pointer-events: none;
  transition: 0.5s;
}
.user-box input:focus ~ label,
.user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: coral;
  font-size: 12px;
}
.user-box input:focus,
.user-box input:valid {
  border-bottom: 1px solid coral;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import {
  required, email, minLength, sameAs, numeric,
} from 'vuelidate/lib/validators';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import variables from '../assets/common';
import constants from '../constants';
import authRequestMixin from '../mixins/authRequestMixin';
import 'vue-loading-overlay/dist/vue-loading.css';

// import QuickCard from '@/components/QuickCard.vue';

export default {
  name: 'Header',
  mixins: [authRequestMixin],
  data: () => ({
    needToShowQuickCart: false,
    isLoading: false,
    siteName: 'Ayen',
    siteDescription: 'Ayen',
    showMobileQuickCart: false,
    menuVisible: false,
    isModalDaftarVisible: false,
    isModalLoginVisible: false,
    searchResult: false,
    searchWord: '',
    searchTimeoutId: '',
    categoriesList: [],
    timeoutId: '',
    needToShowBasket: true,
    needToShowAllProducts: false,
    isUserAuthorized: JSON.parse(localStorage.getItem('isUserAuthorized')),
    productsAT: constants.AVAILABLE_LOCATIONS.AT.products,
    customer: {
      nama: null,
      email: null,
      nomor_hp: null,
      password: null,
      passwordConfirm: null,
    },
    customerLogin: {
      email: null,
      password: null,
    },
  }),
  validations: {
    customer: {
      nama: {
        required,
        minLength: minLength(3),
      },
      nomor_hp: {
        required,
        numeric,
        minLength: minLength(11),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
    customerLogin: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  computed: {
    ...mapGetters(['getCartItemsCount']),
  },
  created() {
  },

  components: {
    Loading,
    // AuthorizationModal,
    // QuickCard,
  },
  methods: {
    ...mapActions(['updateAuth', 'updateProductFromMenu']),
    logOut() {
      const path = '/';

      if (this.$route.path !== path) {
        this.$router.push('/');
      }

      localStorage.setItem('isUserAuthorized', false);
      this.isUserAuthorized = false;
    },
    checkIsAuth() {
      if (JSON.parse(localStorage.getItem('isUserAuthorized'))) {
        return true;
      }
      this.isUserAuthorized = false;
      return false;
    },
    showModal() {
      this.isModalDaftarVisible = true;
    },
    showModalLogin() {
      this.isModalLoginVisible = true;
    },
    onRegisterButtonClick() {
      this.showModal();
    },
    onLoginButtonClick() {
      this.showModalLogin();
    },
    onHover(needToShow) {
      if (needToShow) {
        clearTimeout(this.timeoutId);
        this.needToShowQuickCart = needToShow;
      } else {
        this.timeoutId = setTimeout(() => {
          this.needToShowQuickCart = false;
        }, 200);
      }
    },
    closeModalFlag() {
      this.isModalDaftarVisible = false;
    },
    closeModalLoginFlag() {
      this.isModalLoginVisible = false;
      this.clearSignUpForm();
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    goToBasket() {
      this.needToShowQuickCart = false;
      this.$router.push('/basket');
    },
    openMobileBasket() {
      this.showMobileQuickCart = true;
    },
    quickCartActionHandler(data) {
      this.showMobileQuickCart = data;
    },
    buildImgUrl(urlPart) {
      return variables.imgServer + urlPart;
    },
    categoryFilter(id) {
      this.$router.push(`/categories/${id}`);
      this.menuVisible = false;
    },
    onProductSelect(product) {
      this.updateProductFromMenu(product);
      this.toggleMenu();
    },
    validateFormRegister() {
      this.isLoading = true;
      this.$v.customer.$touch();
      if (!this.$v.customer.$invalid) {
        this.signIn();
      } else {
        this.clearSignInForm();
      }
    },
    validateFormLogin() {
      this.isLoading = true;
      this.$v.customerLogin.$touch();
      if (!this.$v.customerLogin.$invalid) {
        this.signUp();
      } else {
        this.clearSignUpForm();
      }
    },
    clearSignUpForm() {
      this.isLoading = false;
      this.$v.$reset();
      this.customerLogin.email = null;
      this.customerLogin.password = null;
    },
    clearSignInForm() {
      this.isLoading = false;
      this.$v.$reset();
      this.customer.email = null;
      this.customer.passwordConfirm = null;
      this.customer.password = null;
    },
    signIn() {
      const { customer } = this;
      const formData = new FormData();
      formData.append('nama', customer.nama);
      formData.append('email', customer.email);
      formData.append('nomor_hp', customer.nomor_hp);
      formData.append('password', customer.password);
      formData.append('passwordConfirm', customer.passwordConfirm);
      axios
        .post('https://ayen.koula.id/api/v1/register', formData, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        })
        .then((response) => {
          localStorage.setItem('contextToken', response.data.data.token);
          localStorage.setItem('isUserAuthorized', true);
          // this.replaceOrder();
          this.$toaster.error('Berhasil Registrasi');
          this.isLoading = false;
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          this.$toaster.error('Email Sudah digunakan');
          this.clearSignInForm();
        });
    },
    signUp() {
      const { customerLogin } = this;
      this.isLoading = true;
      const formData = new FormData();
      formData.append('email', customerLogin.email);
      formData.append('password', customerLogin.password);
      axios
        .post('https://ayen.koula.id/api/v1/login', formData, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        })
        .then((response) => {
          localStorage.setItem('contextToken', response.data.data.token);
          localStorage.setItem('isUserAuthorized', true);
          // this.replaceOrder();
          this.isLoading = false;
          this.isUserAuthorized = true;
          this.closeModalLoginFlag();
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          this.$toaster.error('Email atau Password salah');
          this.isLoading = false;
        });
    },
  },
  watch: {
    $route() {
      if (this.$route.path === '/basket') {
        this.needToShowBasket = false;
      } else {
        this.needToShowBasket = true;
      }
      if (this.$route.path === '/') {
        this.checkIsAuth();
      }
    },
  },
};
</script>

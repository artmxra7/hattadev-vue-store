<template>
  <section class="section" id="profile">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-12">
          <div class="cart_profile">
            <div class="row col-12 col-lg-12">
              <div class="col-10">
                <div class="userInfo">
                  <h3 class="name__style">{{ customer.nama }}</h3>
                  <h3>{{ customer.email }}</h3>
                  <h3>{{ customer.nomor_hp }}</h3>
                </div>
              </div>
              <div class="col-2" v-if="!showAllMenu">
                <button class="header__cart" @click="handleShowAllMenu()" type="button">
                  <img src="../../assets/svg-icons/writing.svg" alt="signIn icon" />
                  <span>Pengaturan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-12" v-if="showAllMenu">
          <div class="cart_profile">
            <h3 class="name__style">Pengaturan</h3>
            <button class="form__btn" type="button" @click="handleEditProfileOpen()">
              Edit Profile
            </button>
            <button class="form__btn" type="button" @click="handleEditEmailOpen()">
              Ubah Email
            </button>
            <button class="form__btn" type="button" @click="handleEditPasswordOpen()">
              Ubah Password
            </button>
          </div>
        </div>
        <div class="col-12">
          <router-link to="/order">
            <button class="form__btn" type="button">
              Lihat Order Transaksi
            </button>
          </router-link>
          <button class="logout__btn" type="button" @click="logOut()">
            Logout
          </button>
        </div>
      </div>
    </div>
    <vue-final-modal
      :click-to-close="false"
      v-model="isModalEditProfile"
      classes="modal-container"
      content-class="modal-content"
    >
      <Loading :active.sync="isLoading" :is-full-page="true" loader="dots" color="blue"></Loading>
      <button class="header__close" @click="handleEditProfileClose()">
        <img src="../../assets/svg-icons/error.svg" alt="Close icon" />
      </button>
      <span class="modal__title">Edit Profile</span>
      <form @submit.prevent="validateFormEditProfile()">
        <div class="modal__content">
          <label ref="modalLabel" id="modal-p"></label>
          <div class="container-input">
            <div class="user-box">
              <input v-model="customer.nama" type="text" name="input-email" alt="input-email" required />
              <label>Nama</label>
            </div>
            <div class="user-box">
              <input v-model="customer.nomor_hp" type="number" name="input-email" alt="input-email" required />
              <label>Nomor Handphone</label>
            </div>
            <div class="user-box">
              <input v-model="customer.alamat" type="text" name="input-secret" alt="input-secret" required />
              <label>Alamat</label>
            </div>
            <div class="user-box">
              <input v-model="customer.jenis_kelamin" type="text" name="input-secret" alt="input-secret" required />
              <label>Jenis Kelamin</label>
            </div>
          </div>
          <div class="modal__action" @click.prevent="validateFormEditProfile()">
            <button class="form__btn" type="button">
              Update
            </button>
          </div>
        </div>
      </form>
    </vue-final-modal>
    <vue-final-modal
      :click-to-close="false"
      v-model="isModalEditEmail"
      classes="modal-container"
      content-class="modal-content"
    >
      <Loading :active.sync="isLoading" :is-full-page="true" loader="dots" color="blue"></Loading>
      <button class="header__close" @click="handleEditEmailClose()">
        <img src="../../assets/svg-icons/error.svg" alt="Close icon" />
      </button>
      <span class="modal__title">Edit Email</span>
      <form @submit.prevent="validateFormEmail()">
        <div class="modal__content">
          <label ref="modalLabel" id="modal-p"></label>
          <div class="container-input">
            <div class="user-box">
              <input v-model="customerEmail.email" type="text" name="input-email" alt="input-email" required />
              <label>Masukan Alamat Email Baru</label>
            </div>
          </div>
          <div class="modal__action" @click.prevent="validateFormEmail()">
            <button class="form__btn" type="button">
              Update
            </button>
          </div>
        </div>
      </form>
    </vue-final-modal>
    <vue-final-modal
      :click-to-close="false"
      v-model="isModalEditPassword"
      classes="modal-container"
      content-class="modal-content"
    >
      <Loading :active.sync="isLoading" :is-full-page="true" loader="dots" color="blue"></Loading>
      <button class="header__close" @click="handleEditPasswordClose()">
        <img src="../../assets/svg-icons/error.svg" alt="Close icon" />
      </button>
      <span class="modal__title">Ubah Password</span>
      <form @submit.prevent="validateFormEditPassword()">
        <div class="modal__content">
          <label ref="modalLabel" id="modal-p"></label>
          <div class="container-input">
            <div class="user-box">
              <input v-model="customerPassword.password" type="password" name="input-email" alt="input-email" required />
              <label>Masukan Password Baru</label>
              <span class="md-error" v-if="!$v.customerPassword.password.required">
                Password tidak boleh kosong
              </span>
              <span class="md-error" v-else-if="!$v.customerPassword.password.minLength">
                Password minimal 8 Karakter
              </span>
            </div>
            <div class="user-box">
              <input
                v-model="customerPassword.passwordConfirm"
                type="password"
                name="input-email"
                alt="input-email"
                required
              />
              <label>Konfirmasi Password Baru</label>
               <span class="md-error" v-if="!$v.customerPassword.passwordConfirm.required">
                Masukan konfirmasi password
              </span>
              <span class="md-error" v-else-if="!$v.customerPassword.passwordConfirm.sameAsPassword">
                Password tidak sama
              </span>
            </div>
          </div>
          <div class="modal__action" @click.prevent="validateFormEditPassword()">
            <button class="form__btn" type="button">
              Update
            </button>
          </div>
        </div>
      </form>
    </vue-final-modal>
  </section>
</template>

<script>
import {
  minLength, required, sameAs, email,
} from 'vuelidate/lib/validators';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import variables from '../../assets/common';
import authRequestMixin from '../../mixins/authRequestMixin';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Profile',
  mixins: [authRequestMixin],
  data: () => ({
    showAllMenu: false,
    isLoading: false,
    isModalEditProfile: false,
    isModalEditEmail: false,
    isModalEditPassword: false,
    customer: {
      nama: '',
      alamat: '',
      email: '',
      jenis_kelamin: '',
      nomor_hp: '',
      username: '',
    },
    customerEmail: {
      email: '',
    },
    customerPassword: {
      password: '',
      passwordConfirm: '',
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
        minLength: minLength(11),
      },
    },
    customerEmail: {
      email: {
        required,
        email,
      },
    },
    customerPassword: {
      password: {
        required,
        minLength: minLength(8),
      },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  created() {
    this.fetchProfile();
  },
  components: {
    Loading,
  },
  methods: {
    handleEditProfileOpen() {
      this.isModalEditProfile = true;
    },
    handleEditProfileClose() {
      this.isModalEditProfile = false;
    },
    handleEditEmailOpen() {
      this.isModalEditEmail = true;
    },
    handleEditEmailClose() {
      this.isModalEditEmail = false;
    },
    handleEditPasswordOpen() {
      this.isModalEditPassword = true;
    },
    handleEditPasswordClose() {
      this.isModalEditPassword = false;
    },
    validateFormEmail() {
      this.isLoading = true;
      this.$v.customerEmail.$touch();
      if (!this.$v.customerEmail.$invalid) {
        this.editEmail();
      } else {
        this.isLoading = false;
      }
    },
    validateFormEditProfile() {
      this.isLoading = true;
      this.$v.customer.$touch();
      if (!this.$v.customer.$invalid) {
        this.editProfile();
      } else {
        this.isLoading = false;
      }
    },
    validateFormEditPassword() {
      this.isLoading = true;
      this.$v.customerPassword.$touch();
      if (!this.$v.customerPassword.$invalid) {
        this.editPassword();
      } else {
        this.isLoading = false;
      }
    },
    editProfile() {
      const token = localStorage.getItem('contextToken');
      const { customer } = this;
      const formData = new FormData();
      formData.append('nama', customer.nama);
      formData.append('nomor_hp', customer.nomor_hp);
      formData.append('jenis_kelamin', customer.jenis_kelamin);
      formData.append('alamat', customer.alamat);
      axios
        .post(`${variables.server}/user/profile/edit`, formData, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.$toaster.success('Edit Profile Berhasil');
          this.customer = response.data.data;
          this.isLoading = false;
          this.isModalEditProfile = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.$toaster.error('Gagal Edit Profile');
        });
    },
    editEmail() {
      const token = localStorage.getItem('contextToken');
      const { customerEmail } = this;
      const formData = new FormData();
      formData.append('email', customerEmail.email);
      axios
        .post(`${variables.server}/user/profile/email`, formData, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.$toaster.success('Update Email Berhasil');
          this.customer = response.data.data;
          this.customerEmail.email = this.customer.email;
          this.isLoading = false;
          this.isModalEditEmail = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.$toaster.error('Email Sudah digunakan');
        });
    },
    editPassword() {
      const token = localStorage.getItem('contextToken');
      const { customerPassword } = this;
      const formData = new FormData();
      formData.append('password', customerPassword.password);
      axios
        .post(`${variables.server}/user/profile/password`, formData, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.$toaster.success('Password berhasil dirubah');
          this.customer = response.data.data;
          this.customerEmail.email = this.customer.email;
          this.isLoading = false;
          this.isModalEditPassword = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.$toaster.error('Terjadi Kesalahan');
        });
    },
    logOut() {
      const path = '/';
      localStorage.removeItem('contextToken');
      localStorage.removeItem('order_code');
      localStorage.removeItem('isUserAuthorized');
      this.isUserAuthorized = false;
      if (this.$route.path !== path) {
        this.$router.push('/');
      }
    },
    fetchProfile() {
      const token = localStorage.getItem('contextToken');
      axios
        .get(`${variables.server}/user/profile`, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.customer = response.data.data;
          this.customerEmail.email = this.customer.email;
        })
        .catch((e) => {
          this.errorHandler('On get customer by id', e);
        });
    },
    handleShowAllMenu() {
      this.showAllMenu = true;
    },
    changeUserData() {
      axios
        .put(`${variables.server}/customers/${this.customer.data.id}`, { data: this.customer.data }, this.authHeader)
        .then((response) => {
          this.customer = response.data;
          this.$toaster.success(`${this.$t('notify.profile')} ${this.$t('notify.hasBeenChanged')}`);
          this.$router.push('/user-profile');
        })
        .catch((e) => {
          this.errorHandler('On put user data', e);
        });
    },
    getValidationClass(fieldName) {
      const field = this.$v.customer.data.attributes[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }

      return false;
    },
    validateUserProfile() {
      this.$v.customer.data.attributes.$touch();

      if (!this.$v.customer.data.attributes.$invalid) {
        this.changeUserData();
      }
    },
  },
};
</script>

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

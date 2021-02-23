<template>
  <section class="section" id="cart">
    <Loading :active.sync="isLoading" :is-full-page="true" loader="dots" color="blue"></Loading>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- section title -->
          <h2 class="section__title">Jumlah barang ({{ basketItems.length }})</h2>
          <!-- end section title -->

          <div class="basket">
            <div :items="basketItems">
              <div class="col-12 col-lg-12">
                <div class="cart">
                  <div class="table-responsive">
                    <table class="cart__table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Title</th>
                          <th>Quantity</th>
                          <th>Type</th>
                          <th>Price</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="(item, index) in basketItems" :key="item.id">
                          <td>
                            <div class="cart__img">
                              <img :src="item.products_image_url" alt="" />
                            </div>
                          </td>
                          <td>
                            <div>
                              {{ item.products_name }}
                            </div>
                          </td>
                          <td>
                            <div class="cart__quantity">
                              <button @click="increamentItem(item)" :disabled="item.qty < 2" type="button">
                                <i class="ion ion-ios-remove"></i>
                              </button>
                              <input type="text" v-model="item.qty" />
                              <button @click="decreamentItem(item)" :disabled="item.qty >= item.stok" type="button">
                                <i class="ion ion-ios-add"></i>
                              </button>
                            </div>
                          </td>
                          <td>
                            <span class="cart__price">{{ item.satuan }}</span>
                          </td>
                          <td>
                            <span class="cart__price">{{ (item.qty * item.price) | currency }}</span>
                          </td>
                          <td>
                            <button @click="removeItem(item, index)" class="cart__delete" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                                <line
                                  x1="368"
                                  y1="368"
                                  x2="144"
                                  y2="144"
                                  style="
                                    fill: none;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 32px;
                                  "
                                />
                                <line
                                  x1="368"
                                  y1="144"
                                  x2="144"
                                  y2="368"
                                  style="
                                    fill: none;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 32px;
                                  "
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>

                        <tr v-show="basketItems.length === 0">
                          <td colspan="6">
                            <p class="cart__empty">Cart is empty</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="cart__info">
                    <div class="cart__total">
                      <p>Total:</p>
                      <span> {{ Total | currency }}</span>
                    </div>
                    <div v-if="basketItems.length > 0" class="width-100">
                      <button class="form__btn" type="button" @click="checkoutCart()" v-if="!thisCheckout">
                        Checkout
                      </button>
                    </div>
                  </div>
                  <div class="cart__info" v-if="thisCheckout">
                    <div class="separator"></div>
                    <form @submit.prevent="validateForm()" class="form-checkout">
                      <h4 class="checkout__title">Checkout</h4>
                      <div class="form__group">
                        <input
                          type="text"
                          name="name"
                          v-model="formPesanan.alamat"
                          placeholder="Alamat Lengkap Pengiriman"
                        />
                        <span class="md-error" v-if="!$v.formPesanan.alamat.required">
                          Alamat pengiriman tidak boleh kosong
                        </span>
                        <span class="md-error" v-else-if="!$v.formPesanan.alamat.minLength">
                          Alamat pengiriman terlalu pendek
                        </span>
                      </div>
                      <div class="form__group">
                        <input type="number" name="phone" v-model="formPesanan.noHp" placeholder="Nomor penerima" />
                        <span class="md-error" v-if="!$v.formPesanan.noHp.required">
                          Nomor telepon penerima tidak boleh kosong
                        </span>
                        <span class="md-error" v-else-if="!$v.formPesanan.noHp.minLength">
                          Nomor telepon tidak dikenal
                        </span>
                      </div>
                      <div class="form__group">
                        <input type="text" name="phone" v-model="formPesanan.kurir" placeholder="Kurir Pengiriman" />
                      </div>

                      <button class="form__btn" type="button" @click.prevent="validateForm()">
                        Order Sekarang
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- cart -->

      <!-- end cart -->
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { minLength, required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import variables from '../assets/common';
// import common from '../assets/common';
import authRequestMixin from '../mixins/authRequestMixin';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Basket',
  mixins: [authRequestMixin],
  components: {
    Loading,
    // Card,
    // Quantity,
    // AuthorizationModal,
  },
  data: () => ({
    generalData: {},
    basketItems: [],
    currency: {},
    thisCheckout: false,
    isModalVisible: false,
    Total: 0,
    formPesanan: {
      alamat: null,
      noHp: null,
      kurir: '',
    },
    isLoading: false,
  }),
  validations: {
    formPesanan: {
      alamat: {
        required,
        minLength: minLength(10),
      },
      noHp: {
        required,
        minLength: minLength(11),
      },
    },
  },
  created() {
    this.fetchDataKeranjang();
  },
  computed: {
    ...mapGetters(['getAllCartItems', 'getOrderCode']),
  },
  methods: {
    ...mapActions(['updateCartItems', 'createOrderCode']),
    fetchDataKeranjang() {
      const cartToken = localStorage.getItem('contextToken');
      const orderCode = localStorage.getItem('order_code');
      const formData = new FormData();
      formData.append('order_code', orderCode);
      if (cartToken) {
        axios
          .post(`${variables.server}/user/keranjang`, formData, {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${cartToken}`,
            },
          })
          .then((response) => {
            this.basketItems = response.data.data.barang;
            this.Total = response.data.data.total_amount;
          })
          .catch(() => {
            this.$toaster.error('Gagal saat mengambil keranjang pesanan');
          });
      }
    },
    clearForm() {
      this.isLoading = false;
      this.$v.$reset();
      this.formPesanan.alamat = null;
      this.formPesanan.noHp = null;
      this.formPesanan.kurir = '';
      this.$toaster.error('Harap isi Form dengan benar');
    },

    validateForm() {
      this.isLoading = true;
      this.$v.formPesanan.$touch();
      if (!this.$v.formPesanan.$invalid) {
        this.createOrder();
      } else {
        this.clearForm();
      }
    },
    createOrder() {
      const orderCode = localStorage.getItem('order_code');
      const token = localStorage.getItem('contextToken');
      const { formPesanan } = this;

      const formData = new FormData();
      formData.append('order_code', orderCode);
      formData.append('total', this.Total);
      formData.append('alamat', formPesanan.alamat);
      formData.append('noHp', formPesanan.noHp);
      formData.append('kurir', formPesanan.kurir);
      axios
        .post(`${variables.server}/user/order`, formData, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.$toaster.error('Order telah dikirim');
          this.isLoading = false;
          const path = '/order';
          localStorage.removeItem('order_code');

          if (this.$route.path !== path) {
            this.$router.push('/order');
          }
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          this.$toaster.error('Email Sudah digunakan');
          this.clearForm();
        });
    },
    removeItem(item, index) {
      this.basketItems.splice(index, 1);
      this.onDeleteCartItem(item);
    },
    onDeleteCartItem(params) {
      const formData = new FormData();
      formData.append('order_code', params.order_code);
      formData.append('id', params.products_id);

      const token = localStorage.getItem('contextToken');
      axios
        .post(
          `${variables.server}/user/keranjang/hapus`,
          formData,

          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          // eslint-disable-next-line camelcase
          const { keranjang, user_order_code } = response.data.data;
          this.updateCartItems(keranjang);
          this.createOrderCode(user_order_code);
          this.basketItems = keranjang;
          this.Total = response.data.data.total_amount;
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error('Error occured on delete the basket item ', e);
          this.$toaster.error('Ooops terjadi kesalahan');
        });
    },
    decreamentItem(quantityData) {
      const formData = new FormData();
      formData.append('order_code', quantityData.order_code);
      formData.append('id', quantityData.products_id);
      formData.append('price', quantityData.price);
      formData.append('qty', quantityData.qty);
      const token = localStorage.getItem('contextToken');
      axios
        .post(
          `${variables.server}/user/keranjang/decreament`,

          formData,

          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          // eslint-disable-next-line camelcase
          const { keranjang, user_order_code } = response.data.data;
          this.updateCartItems(keranjang);
          this.createOrderCode(user_order_code);
          this.basketItems = keranjang;
          this.Total = response.data.data.total_amount;
        })
        .catch((e) => {
          console.error('Error occured on change quantity in basket ', e);
          this.$toaster.error(this.$t('notify.oops'));
        });
    },
    increamentItem(quantityData) {
      const formData = new FormData();
      formData.append('order_code', quantityData.order_code);
      formData.append('id', quantityData.products_id);
      formData.append('price', quantityData.price);
      formData.append('qty', quantityData.qty);
      const token = localStorage.getItem('contextToken');
      axios
        .post(
          `${variables.server}/user/keranjang/increament`,

          formData,

          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          // eslint-disable-next-line camelcase
          const { keranjang, user_order_code } = response.data.data;
          this.updateCartItems(keranjang);
          this.createOrderCode(user_order_code);
          this.basketItems = keranjang;
          this.Total = response.data.data.total_amount;
        })
        .catch((e) => {
          console.error('Error occured on change quantity in basket ', e);
          this.$toaster.error(this.$t('notify.oops'));
        });
    },
    checkoutCart() {
      this.thisCheckout = true;
    },
    openModalFlag() {
      this.isModalVisible = true;
    },
    closeModalFlag() {
      this.isModalVisible = false;
    },
  },
};
</script>
<style lang="css" scoped>
.form-checkout {
  width: 100%;
  margin-top: 1rem;
}
.separator {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #000;
}
.text-sparator {
  font-size: 1rem;
}

.separator:not(:empty)::before {
  margin-right: 0.25em;
}

.separator:not(:empty)::after {
  margin-left: 0.25em;
}
</style>

<template>
  <section class="section" id="catalog">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- section title -->
          <h2 class="section__title">Catalog</h2>
          <!-- end section title -->

          <!-- section sort -->
          <div class="section__sort">
            <button :class="{ active: currentFilter === 'all' }" @click="setFilter('all')" type="button">
              All
            </button>
            <div v-for="categorys in category" :key="categorys.id">
              <button
                :class="{ active: currentFilter === categorys.nama }"
                @click="setFilter(categorys.nama)"
                type="button"
              >
                {{ categorys.nama }}
              </button>
            </div>
          </div>
          <!-- end section sort -->
        </div>
      </div>
    </div>
    <div class="container">
      <transition-group name="fadex" class="row row--grid" tag="div">
        <div
          v-for="item in filteredProducts"
          class="col-12 col-sm-6 col-lg-4 erwin-pointer"
          @click="detailItem(item)"
          :key="item.id"
        >
          <div class="product">
            <div class="product__img">
              <img :src="item.foto_url" alt="" />
            </div>
            <h3 class="product__title">{{ item.nama }}</h3>
            <div class="discount-erwin">
              <div data-testid="lblProductDiscount#1">{{ item.diskon }} %</div>
              <div>{{ item.harga | currency }}</div>
            </div>
            <div>
              <span class="product__price">{{ (((100 - item.diskon) / 100) * item.harga) | currency }}</span>
            </div>
            <button @click="addToCart(item)" class="product__add" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                <path
                  d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
                  style="
                        fill: none;
                        stroke-miterlimit: 10;
                        stroke-width: 32px;
                      "
                />
                <line
                  x1="256"
                  y1="176"
                  x2="256"
                  y2="336"
                  style="
                        fill: none;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 32px;
                      "
                />
                <line
                  x1="336"
                  y1="256"
                  x2="176"
                  y2="256"
                  style="
                        fill: none;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 32px;
                      "
                />
              </svg>
            </button>
          </div>
        </div>
      </transition-group>
    </div>
    <vue-final-modal
      :click-to-close="false"
      v-model="isModalDetail"
      classes="modal-container"
      content-class="modal-content"
    >
      <button class="header__close" @click="handleModalDetailClose()">
        <img src="../assets/svg-icons/error.svg" alt="Close icon" />
      </button>
      <span class="modal__title">Detail Produk</span>
      <div class="modal__content">
        <div class="product__img__detail">
          <img :src="detailProduct.foto_url" alt="" />
        </div>
        <h3 class="product__title">{{ detailProduct.nama }}</h3>
        <div class="discount-erwin">
          <div data-testid="lblProductDiscount#1">{{ detailProduct.diskon }} %</div>
          <div>{{ detailProduct.harga | currency }}</div>
        </div>
        <div class="deskripsi">
          <span class="product__price">{{ (((100 - detailProduct.diskon) / 100) * detailProduct.harga) | currency }}</span>
        </div>
         <p class="product__desc" v-html="detailProduct.deskripsi">{{ detailProduct.deskripsi }}</p>

        <div class="modal__action" @click.prevent="tambahKeranjang()">
          <button class="form__btn" type="button">
            Tambahkan ke Keranjang
          </button>
        </div>
      </div>
    </vue-final-modal>
  </section>
</template>

<style></style>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import variables from '../assets/common';

export default {
  name: 'Home',
  data: () => ({
    cartItems: [],
    isModalDetail: false,
    detailProduct: {
      nama: '',
    },
    // items: products,
    items: [],
    category: [],
    currentFilter: 'all',
    isUserAuthorized: JSON.parse(localStorage.getItem('isUserAuthorized')),
  }),
  created() {
    // eslint-disable-next-line no-console
    this.getProductData();
    this.getCategoryProductData();
  },
  computed: {
    ...mapGetters(['getAllCartItems', 'getOrderCode']),
    filteredProducts() {
      // comprobamos el valor current filter = a todos para mostrar todos los productos
      // return this.products.filter(p => this.currentFilter === 'todos' || p.category.toLowerCase() === this.currentFilter.toLowerCase())
      if (this.currentFilter === 'all') {
        return [...this.items];
      }
      return [...this.items].filter(p => p.kategori.toLowerCase() === this.currentFilter.toLowerCase());
    },
  },
  methods: {
    ...mapActions(['updateCartItems', 'createOrderCode']),
    getProductData() {
      axios.get(`${variables.server}/products/all`).then((response) => {
        this.items = response.data.data;
      });
    },
    getCategoryProductData() {
      axios.get(`${variables.server}/category/all`).then((response) => {
        this.category = response.data.data;

        // eslint-disable-next-line no-console
      });
    },
    isAuth() {
      if (JSON.parse(localStorage.getItem('isUserAuthorized'))) {
        return true;
      }
      return false;
    },
    handleModalDetailClose() {
      this.isModalDetail = false;
    },
    tambahKeranjang() {
      this.addToCart(this.detailProduct);
    },
    detailItem(item) {
      this.isModalDetail = true;
      this.detailProduct = item;
    },
    // add items to cart
    addToCart(itemToAdd) {
      // eslint-disable-next-line no-console

      if (this.isAuth()) {
        // add the item or increase quantity
        // eslint-disable-next-line no-unused-vars
        let orderCode = '';
        if (this.getOrderCode !== null) {
          orderCode = this.getOrderCode;
        }

        // eslint-disable-next-line no-console
        const formData = new FormData();
        formData.append('order_code', orderCode);
        formData.append('diskon', itemToAdd.diskon);
        formData.append('stok', itemToAdd.stok);
        formData.append('foto_url', itemToAdd.foto);
        formData.append('harga', ((100 - itemToAdd.diskon) / 100) * itemToAdd.harga);
        formData.append('id', itemToAdd.id);
        formData.append('kategori', itemToAdd.kategori);
        formData.append('nama', itemToAdd.nama);
        formData.append('satuan', itemToAdd.satuan);
        const token = localStorage.getItem('contextToken');
        axios
          .post(`${variables.server}/user/keranjang/add`, formData, {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // eslint-disable-next-line camelcase
            const { keranjang, user_order_code } = response.data.data;
            this.updateCartItems(keranjang);
            this.createOrderCode(user_order_code);
            localStorage.setItem('order_code', user_order_code);
            this.$toaster.success('Barang di tambahkan ke keranjang');
          })
          .catch(() => {});
      } else {
        this.$swal('Silahkan login terlebih dahulu');
      }
    },
    // category filter
    setFilter(filter) {
      this.currentFilter = filter;
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
  height: 95%;
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

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
        <div v-for="item in filteredProducts" class="col-12 col-sm-6 col-lg-4" :key="item.id">
          <div class="product">
            <div class="product__img">
              <img :src="item.foto_url" alt="" />
            </div>
            <h3 class="product__title">{{ item.nama }}</h3>
            <div class="discount-erwin">
              <div data-testid="lblProductDiscount#1">{{ item.diskon }} %</div>
              <div> {{ item.harga | currency  }}
              </div>
            </div>
            <div>
            <span class="product__price">{{ (100 - item.diskon)/100*item.harga | currency }}</span>
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
  </section>
</template>

<style></style>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-use-before-define

export default {
  name: 'Home',
  data: () => ({
    cartItems: [],
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
      axios.get('https://ayen.koula.id/api/v1/products/all').then((response) => {
        this.items = response.data.data;
        console.log(this.items);
        // eslint-disable-next-line no-console
      });
    },
    getCategoryProductData() {
      axios.get('https://ayen.koula.id/api/v1/category/all').then((response) => {
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
        formData.append('harga', (100 - itemToAdd.diskon) / 100 * itemToAdd.harga);
        formData.append('id', itemToAdd.id);
        formData.append('kategori', itemToAdd.kategori);
        formData.append('nama', itemToAdd.nama);
        formData.append('satuan', itemToAdd.satuan);
        const token = localStorage.getItem('contextToken');
        axios
          .post('https://ayen.koula.id/api/v1/user/keranjang/add', formData, {
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
          .catch(() => {
            // eslint-disable-next-line no-console
            // this.$toaster.error('Email atau Password salah');
            // this.isLoading = false;
          });
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

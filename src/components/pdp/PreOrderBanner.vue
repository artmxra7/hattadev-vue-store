<template>
  <div v-if="prodData.translated && prodContext" class="preorder-banner">
    <div class="preorder-banner__header mar-top-2">
      <h3 class="preorder-banner__header-product-name">
        <b>{{prodData.translated.name}}</b>
      </h3>
      <div class="preorder-banner__header-wish-section">
      </div>
    </div>
    <div class="preorder-banner__price-and-delivery-general-description mar-top-2 text-left">
      <p>{{prodData.translated.customFields.axonlab_product_title2}}</p>
    </div>
    <div class="preorder-banner__price-and-delivery mar-b-1">
      <span
        class="preorder-banner__price-and-delivery-regular-price"
      >
        <b v-if="prodData.calculatedPrice">{{prodData.calculatedPrice.totalPrice | formatPrice}}</b>
        <span> {{ isoCode }}</span>
      </span>
      <div class="preorder-banner__quantity-select text-left">
        <span> {{$t('preOrderBanner.quantity')}}: </span>
        <Quantity
          :minQuantity="selectedQuantity.minValue"
          :maxQuantity="selectedQuantity.maxValue"
          v-on:quantityValue="onQuantitySelect($event)"
        />
      </div>
    </div>
    <button
      @click="addToBasket()"
      class="preorder-banner__request-button mar-top-2"
    >
      <b>in den warenkorb</b>
    </button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import Quantity from '../Quantity.vue';

export default {
  name: 'PreOrderBanner',
  props: {
    prodData: {
      type: Object,
      required: true,
    },
    prodContext: {
      type: Object,
      required: true,
    },
  },
  components: {
    Quantity,
  },
  computed: {
    ...mapGetters(['getAllCartItems']),
  },
  data: () => ({
    isoCode: '',
    price: undefined,
    selectedQuantity: {
      maxValue: 999999,
      minValue: 0,
      selectedValue: 1,
      quantityId: 1,
    },
  }),
  created() {
    this.setIsoCode();
  },
  methods: {
    ...mapActions(['updateCartItems']),
    addToBasket() {
      const productCardData = {
        items: [
          {
            id: this.prodData.id,
            type: 'product',
            referencedId: this.prodData.id,
            quantity: this.selectedQuantity.selectedValue,
          },
        ],
      };

      if (this.getAllCartItems.id) {
        productCardData.items[0].id = this.getAllCartItems.id;
      }

      const token = localStorage.getItem('contextToken');

      axios
        .post('http://77.245.20.254/store-api/v3/checkout/cart/line-item',
          productCardData,
          {
            headers: {
              'sw-access-key': 'SWSCAUPEWFJVU0FVC20WCNDLUG',
              'sw-context-token': token,
            },
          })
        .then((response) => {
          if (response) {
            productCardData.items[0].id = response.data.lineItems[0].id;
            this.updateCartItems(response.data.lineItems);
          }
        })
        .catch((error) => {
          console.log('error', error);
          this.$toaster.error(this.$t('notify.oops'));
        });
    },
    onQuantitySelect(quantity) {
      this.selectedQuantity.selectedValue = quantity;
    },
    setIsoCode() {
      if (this.prodContext && this.prodContext.currency.isoCode) {
        this.isoCode = this.prodContext.currency.symbol;
      }
    },
  },

  filters: {
    formatPrice: (value => value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')),
  },
};
</script>

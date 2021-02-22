<template>
  <div
    v-if="cartItesmAttributes && cartItesmAttributes.currency"
    class="quick-cart"
  >
    <div
      class="quick-cart__item md-layout"
      v-for="(item, index) in cartItesmAttributes.items"
      :key="index"
    >
      <div class="md-layout-item md-size-15 quick-cart__img">
        <img :src="getImgUrl(item.product.images)">
      </div>
      <div class="md-layout-item md-size-80 pad-l-1 quick-cart__data">
        <div class="quick-cart__item-name mar-b-1">{{item.product.name}}</div>
        <p>
          <span class="quick-cart__param-name">{{ $t('product.articalNumber') }}</span>
          <span class="quick-cart__param-value">
            {{ item.product.articleNumber }}
          </span>
        </p>
        <p>
          <span class="quick-cart__param-name">{{ $t('product.quantity') }}: </span>
          <span class="quick-cart__param-value">
            {{ item.quantity }}
          </span>
        </p>
        <p>
          <span
            v-if="!item.product.isReagent"
            class="quick-cart__param-name"
          >
            {{ $t('product.rentPeriod') }}:
          </span>
          <span
            v-if="item.product.isReagent"
            class="quick-cart__param-name"
          >
            {{ $t('product.deliveryFrequency') }}:
          </span>
          <span class="quick-cart__param-value">
            {{ findRentPeriodById(item.rentPeriodId) }}
          </span>
        </p>
        <p>
          <span class="quick-cart__param-name">{{ $t('product.serviceType') }}: </span>
          <span class="quick-cart__param-value">
            {{ findServiceById(item.serviceType) }}
          </span>
        </p>
        <p v-if="showTestRanges(item)">
          <span class="quick-cart__param-name">{{ $t('product.testRange') }}: </span>
          <span class="quick-cart__param-value">
            {{ findTestRangeById(item.testRangeId) }}
          </span>
        </p>
        <p class="mar-t-1">
          <span class="quick-cart__param-name">{{ $t('product.netPrice') }}: </span>
          <span class="quick-cart__param-value_price">
            {{ item.sumNetPrice | formatPrice}} {{ cartItesmAttributes.currency.symbol }}
          </span>
        </p>
      </div>
      <div class="md-layout-item md-size-5">
        <i
          @click="deleteCartItem(item.id)"
          class="delete-icon md-icon md-icon-font md-theme-default"
        >
          close
        </i>
      </div>
    </div>
    <hr>
    <div class="quick-cart__footer">
      <div class="total-price">
        <p>{{ $t('basket.subtotal') }}
          <span class="quick-cart__param-value_price">
            {{ cartItesmAttributes.netTotal | formatPrice}} {{ cartItesmAttributes.currency.symbol }}
          </span>
        </p>
      </div>
      <div class="buttons md-layout">
        <md-button
          @click="goToBasket()"
          class="radius-block radius-block_full-size mar-b-2"
        >{{ $t('basket.editBasket') }}
        </md-button>
        <md-button
          @click="startCheckout()"
          class="radius-block radius-block_gray-btn radius-block_full-size mar-b-2"
        >{{ $t('basket.checkout') }}
        </md-button>
      </div>
    </div>

    <md-dialog :md-active.sync="isModalVisible">
      <AuthorizationModal
        v-on:changeModalState="closeModalFlag()"
        :login-type="'checkout'"
      />
    </md-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import axios from 'axios';

import common from '../assets/common';
import constants from '../constants';
import AuthorizationModal from './AuthorizationModal.vue';

export default {
  components: {
    AuthorizationModal,
  },
  props: {
    isMobile: Boolean,
  },
  data: () => ({
    items: [],
    prices: [],
    testRange: {},
    subTotalPrice: '',
    cartItesmAttributes: {},
    isModalVisible: false,
    maxQuantityValue: 999999,
  }),
  computed: {
    ...mapGetters(['getAllCartItems']),
    ...mapState(['states']),
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'updateCartItems') {
        this.cartItesmAttributes = mutation.payload.attributes;
        this.items = this.cartItesmAttributes.items;
      }
    });
  },
  methods: {
    ...mapActions(['deleteCartItemById']),
    getImgUrl(images) {
      let selectedImg;

      images.forEach((image) => {
        if (image.isMainPicture) {
          selectedImg = image;
        }
      });
      return common.imgServer + selectedImg.fileName;
    },
    deleteCartItem(id) {
      axios
        .delete(`${common.server}/cart-items/${id}`, {
          headers: {
            'ttg-cart-context-token': localStorage.getItem('cart_context_token'),
          },
        })
        .then(() => {
          this.deleteCartItemById(id);

          if (this.getAllCartItems && this.getAllCartItems.attributes) {
            this.cartItesmAttributes = this.getAllCartItems.attributes;
          }
        });
    },
    findRentPeriodById(id) {
      let rentPeriod;

      if (this.items && this.items.length > 0) {
        this.items.forEach((item) => {
          const prices = item.product.rentPeriods;

          prices.forEach((price) => {
            if (price.id === id) {
              rentPeriod = price.monthQuantity;
            }
          });
        });
      }
      return rentPeriod;
    },
    findServiceById(serviceId) {
      let serviceType = '';

      // eslint-disable-next-line default-case
      switch (serviceId) {
        case constants.SERVICE_TYPES.NO_SERVICE:
          serviceType = 'kein Service';
          break;
        case constants.SERVICE_TYPES.DEFAULT_SERVICE:
          serviceType = 'Standarddienst';
          break;
        case constants.SERVICE_TYPES.FULL_SERVICE:
          serviceType = 'Rundumservice';
          break;
      }
      return serviceType;
    },
    findTestRangeById(id) {
      let testPeriod;

      if (this.items && this.items.length > 0) {
        this.items.forEach((item) => {
          const tests = item.product.testRanges;

          tests.forEach((test) => {
            if (test.id === id) {
              testPeriod = test;
            }
          });
        });
      }
      if (testPeriod.quantityTo === null) {
        testPeriod.quantityTo = 99999;
      }
      return `${testPeriod.quantityFrom} - ${testPeriod.quantityTo}`;
    },
    goToBasket() {
      this.$gtag.event('QuickCart', {
        event_category: 'Button',
        event_label: 'Bearbeiten',
        value: 1,
      });
      this.$router.push('/basket');
      this.closeQuickCartContainer();
      this.emitAction();
    },
    startCheckout() {
      this.$gtag.event('QuickCart', {
        event_category: 'Button',
        event_label: 'Checkout',
        value: 1,
      });
      if (!localStorage.getItem('customer_id')) {
        this.openModalFlag();
      } else {
        this.$router.push('/checkout');
      }
      this.closeQuickCartContainer();
      this.emitAction();
    },
    openModalFlag() {
      this.isModalVisible = true;
    },
    closeModalFlag() {
      this.isModalVisible = false;
    },
    closeQuickCartContainer() {
      const quickCartContainer = document.querySelector('.quick-cart-container');
      quickCartContainer.classList.add('hide');
    },
    emitAction() {
      this.$emit('needShowModal', false);
    },
    showTestRanges(itemEl) {
      return itemEl.product.testRanges.filter((item) => {
        const from = !!item.quantityFrom && item.quantityFrom !== this.maxQuantityValue;
        const to = !!item.quantityTo && item.quantityTo !== this.maxQuantityValue;

        return (from && to) || to;
      }).length;
    },
  },
  filters: {
    formatPrice: (value => value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')),
  },
};
</script>

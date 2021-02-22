<template>
  <div class="flex">
    <div class="flex__stretch md-layout md md-gutter">
      <div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-100">
        <Card
          class="card_horizontal"
          :card-data="basketData.product"
          :no-price="true"
          :no-border="true"
        />
      </div>
      <div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-100">
        <div class="pad-1">
          <div
            class="flex flex_align-center mar-b-1"
            v-if="basketData.status"
          >
            <i
              class="md-icon mar-r-1"
              :class="setOrderStatusColor(basketData.status)"
            >fiber_manual_record</i>
            <span>{{$t(`orderList.${basketData.status}`)}}</span>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-100">
        <div class="pad-lr-1">
          <div class="md-layout md-alignment-center-space-between flex_nowrap">
            <h4 v-if="!basketData.product.isReagent">{{$t('orderList.rentPeriod')}}</h4>
            <h4 v-if="basketData.product.isReagent">{{$t('orderList.deliveryFrequency')}}</h4>
            <div class="mar-l-1">{{basketData.rentPeriod}} {{$t('orderList.month')}}</div>
          </div>
          <hr v-if="getTestRange(basketData)">
          <div
            class="md-layout md-alignment-center-space-between flex_nowrap"
            v-if="getTestRange(basketData)"
          >
            <h4>{{$t('orderList.testRange')}}</h4>
            <div class="mar-l-1">
              {{getTestRange(basketData)}}
            </div>
          </div>
          <hr v-if="!this.basketData.product.isReagent">
          <div
            v-if="!this.basketData.product.isReagent"
            class="md-layout md-alignment-center-space-between flex_nowrap"
          >
            <h4>{{$t('orderList.serviceType')}}</h4>
            <div class="mar-l-1">{{getServiceType(basketData.serviceType)}}</div>
          </div>
          <hr v-if="!this.basketData.product.isReagent">
          <div
            class="md-layout md-alignment-center-space-between flex_nowrap"
            v-if="!this.basketData.product.isReagent"
          >
            <h4>{{$t('orderList.isInstructionsRequired')}}</h4>
            <div class="mar-l-1">
              <i
                class="md-icon success"
                v-if="basketData.isInstructionsRequired"
              >done</i>
              <i
                class="md-icon error"
                v-if="!basketData.isInstructionsRequired"
              >close</i>
            </div>
          </div>
          <hr class="hide show-medium">
        </div>
      </div>
      <div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-100 mar-b-2 mar-t--2 mar-medium-t-0">
        <div class="pad-lr-1 mar-b-2">
          <div class="md-layout md-alignment-center-space-between flex_nowrap">
            <h4>{{$t('basket.price')}}</h4>
            <div class="mar-l-1">{{basketData.netPrice | formatPrice}} {{basketData.currency.symbol}}</div>
          </div>
          <hr>
          <div class="md-layout md-alignment-center-space-between flex_nowrap">
            <h4>{{$t('basket.quantity')}}</h4>
            <Quantity
              v-if="!basketData.quantity"
              class="width-8"
            />
            <div
              v-else
              class="text-center mar-l-1"
            >{{basketData.quantity}}
            </div>
          </div>
          <hr>
          <div class="md-layout md-alignment-center-space-between flex_nowrap">
            <h4>{{$t('basket.totalPrice')}}</h4>
            <div class="mar-l-1">{{basketData.sumNetPrice | formatPrice}} {{basketData.currency.symbol}}</div>
          </div>
          <hr>
          <div class="md-layout md-alignment-center-space-between flex_nowrap">
            <h4>{{$t('basket.sumTaxAmount')}}</h4>
            <div class="mar-l-1">{{basketData.sumTaxAmount | formatPrice}} {{basketData.currency.symbol}}</div>
          </div>
        </div>
        <div
          class="md-layout md-alignment-center-space-between pad-lr-1"
          v-if="this.basketData.status === 'done'"
        >
          <md-button
            class="radius-block mar-b-2"
            @click="showModal(true)"
          >
            {{$t('orderList.cancellation')}}
          </md-button>
          <md-button
            class="radius-block mar-b-2"
            @click="isDialogVisible = true"
            v-if="monthCheck()"
          >
            {{$t('orderList.extension')}}
          </md-button>
        </div>
      </div>
    </div>
    <md-dialog-confirm
      :md-active.sync="isModalVisible"
      :md-title="$t('orderList.dialogTitle')"
      :md-content="$t('orderList.dialogText')"
      :md-confirm-text="$t('orderList.dialogConfirm')"
      :md-cancel-text="$t('orderList.dialogCancel')"
      @md-cancel="showModal(false)"
      @md-confirm="cancelOrderItem()"
    />
    <md-dialog
      :md-active.sync="isDialogVisible"
    >
      <div class="holder">
        <h3 class="mar-b-2">{{$t('orderList.extension')}}</h3>
        <p class="mar-b-2">{{$t('orderList.extensionText')}}</p>
        <CustomSlider
          class="mar-b-2"
          idSliderIdentificator="rentPeriodSlider"
          :sliderData="this.basketData.product.rentPeriods"
          searchByField="monthQuantity"
          :isMovingBox="true"
          v-on:onDataSelect="checkSelectedRentPeriod($event)"
        />
        <div class="md-layout md-alignment-center-space-between">
          <md-button
            class="radius-block"
            @click="isDialogVisible = false"
          >
            {{$t('orderList.dialogCancel')}}
          </md-button>
          <md-button
            class="radius-block"
            @click="extension()"
          >
            {{$t('orderList.extension')}}
          </md-button>
        </div>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import authRequestMixin from '../mixins/authRequestMixin';

import Card from './Card.vue';
import Quantity from './Quantity.vue';
import CustomSlider from './pdp/CustomSlider.vue';

import constants from '../constants';
import common from '../assets/common';

export default {
  name: 'OrderItem',
  mixins: [authRequestMixin],
  components: {
    Card,
    Quantity,
    CustomSlider,
  },
  props: {
    basketData: Object,
  },
  data: () => ({
    isModalVisible: false,
    isDialogVisible: false,
    rentPeriodData: null,
  }),
  methods: {
    monthCheck() {
      const lastElement = this.basketData.product.rentPeriods[this.basketData.product.rentPeriods.length - 1];

      return this.basketData.rentPeriod < lastElement.monthQuantity;
    },
    cancelOrderItem() {
      const data = {
        data: {
          type: 'order-requests',
          attributes: {
            orderNumber: this.basketData.orderNumber,
            orderItemId: this.basketData.id,
          },
        },
      };

      axios
        .post(
          `${common.server}/cancel-order-item`,
          data,
          this.authHeader,
        )
        .then(() => {
          this.showModal(false);
        })
        .catch((e) => {
          this.errorHandler('Order list item cancel', e);
        });
    },
    showModal(status) {
      this.isModalVisible = status;
    },
    getServiceType(num) {
      switch (num) {
        case constants.SERVICE_TYPES.NO_SERVICE:
          return this.$t('orderList.noService');
        case constants.SERVICE_TYPES.DEFAULT_SERVICE:
          return this.$t('orderList.standardService');
        case constants.SERVICE_TYPES.FULL_SERVICE:
          return this.$t('orderList.fullService');
        default:
          return null;
      }
    },
    getTestRange(item) {
      if (!item.testsFrom && !item.testsTo) {
        return null;
      }
      if (item.testsFrom && !item.testsTo) {
        return null;
      }
      if (!item.testsFrom && item.testsTo) {
        return `${this.$t('orderList.to')} ${item.testsTo}`;
      }

      return `${this.$t('orderList.from')} ${item.testsFrom} ${this.$t('orderList.to')} ${item.testsTo}`;
    },

    // TODO: move to constants.js file
    setOrderStatusColor(status) {
      switch (status) {
        case 'open':
          return 'open';
        case 'inProgress':
          return 'warning';
        case 'done':
          return 'success';
        case 'canceledByUser':
          return 'error';
        default:
          return '';
      }
    },
    checkSelectedRentPeriod(e) {
      this.rentPeriodData = e;
    },
    extension() {
      const preparingData = {
        type: 'order-requests',
        attributes: {
          orderNumber: this.basketData.orderNumber,
          orderItemId: this.basketData.id,
          newRentPeriod: this.rentPeriodData.monthQuantity,
        },
      };

      axios.post(
        `${common.server}/extend-rent-period`,
        { data: preparingData },
        this.authHeader,
      )
        .then(() => {
          this.isDialogVisible = false;
          this.$toaster.success(`${this.$t('orderList.rentPeriod')} ${this.$t('notify.hasBeenChanged')}`);
        })
        .catch((e) => {
          this.errorHandler('Order extend rent period', e);
        });
    },
  },
  filters: {
    formatPrice: (value => value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')),
  },
};
</script>

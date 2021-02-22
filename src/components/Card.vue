<template>
  <div
    class="card"
    v-if="cardData"
    :class="{'card_no-border': noBorder}"
  >
    <div class="card__body">
      <div class="card__header">
        <router-link
          :to="`/`"
          class="card__img-wrapp"
        >
          <div
            class="card__img-holder"
            v-if="cardData.cover"
          >
            <img
              class="card__img"
              :src="getImgUrl()"
              :alt="cardData.cover.fileName"
            >
          </div>
        </router-link>
      </div>
      <div class="card__content">
        <h3 class="card__title card__title-link text-overflow">{{ cardData.label }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
// import variables from '../assets/common';

export default {
  name: 'Card',
  props: {
    productId: String,
    cardData: Object,
    index: Number,
    needToRemove: Boolean,
    noPrice: Boolean,
    noBorder: Boolean,
    needShowArtNum: Boolean,
  },
  data: () => ({
    added: false,
  }),
  created() {
    console.log('===>> cardData ', this.cardData);
  },
  methods: {
    getImgUrl() {
      return this.cardData.cover.url;
    },
  },
  filters: {
    formatPrice: (value => value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')),
  },
};
</script>

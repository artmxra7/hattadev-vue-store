<template>
  <div class="change-quantity">
    <div
      class="change-quantity__btn"
      :class="{'change-quantity__btn_hidden': value <= minQuantity}"
      @click="minus()"
    >&minus;</div>
    <input
      class="change-quantity__input"
      type="text"
      v-model="value"
      @change="onManualInput()"
    >
    <div
      class="change-quantity__btn"
      :class="{'change-quantity__btn_hidden': value >= maxQuantity}"
      @click="plus()"
    >+</div>
  </div>
</template>

<script>
export default {
  name: 'Quantity',
  props: {
    minQuantity: {
      type: Number,
      default: 1,
    },
    maxQuantity: {
      type: Number,
      default: 999999,
    },
    selectedValue: Number,
  },
  data: () => ({
    value: 1,
  }),
  created() {
    if (this.selectedValue) {
      this.value = this.selectedValue;
    }
  },
  methods: {
    minus() {
      this.value -= 1;
      this.$emit('quantityValue', this.value);
    },
    plus() {
      this.value += 1;
      this.$emit('quantityValue', this.value);
    },
    onManualInput() {
      this.value = +this.value;

      if (this.value > this.maxQuantity) {
        this.value = this.maxQuantity;
      }

      if (this.value < this.minQuantity) {
        this.value = this.minQuantity;
      }

      this.$emit('quantityValue', this.value);
    },
  },
};
</script>

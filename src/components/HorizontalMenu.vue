<template>
  <div class="md-layout horizontal-menu">
      <ul
        class="horizontal-menu__row-menu"
        v-if="categoriesList && categoriesList.length"
      >
        <li
          class="pointer"
          v-for="(category, index) in categoriesList"
          :class="{'active': selectedMenuIten === category.id}"
          :key="index"
          @click="onCategoryFilter(category.id)"
        >
          {{category.title}}
        </li>
      </ul>
    </div>
</template>
<script>
import constants from '../constants';

export default {
  name: 'HorizontalMenu',
  props: {
    selectedMenuIten: String,
  },
  data: () => ({
    categoriesList: constants.AVAILABLE_LOCATIONS.AT.products,
  }),
  created() {
  },
  methods: {
    onCategoryFilter(id) {
      this.$emit('selectedProductId', id);
    },
  },
};
</script>

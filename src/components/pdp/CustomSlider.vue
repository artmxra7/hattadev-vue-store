<template>
  <div
    class="slider-container"
    :id="idSliderIdentificator"
    ref="slider"
  >
    <div
      class="slider-container__section"
      v-for="(item, index) in sliderData"
      v-bind:key="index"
    >
      <span
        v-if="isActionOnHover"
        :class="{'less-font': !isMovingBox}"
        @mouseover.stop.prevent="onPeriodHover(index)"
      >{{ item[searchByField] }}
      </span>
      <span
        v-if="!isActionOnHover"
        :class="{'less-font': !isMovingBox}"
        @click="onPeriodHover(index)"
      >{{ item[searchByField] }}
      </span>
    </div>
    <!-- Moving circle for numbers -->
    <div
      v-if="isMovingBox"
      class="slider-container__moving-box numbers"
    >
      <div class="number-wrapper">
        <p>
          <b>{{ selectedValue[searchByField] }} +</b>
        </p>
        <p class="month">Monate</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idSliderIdentificator: String,
    sliderData: Array,
    searchByField: String,
    isMovingBox: {
      type: Boolean,
      default: true,
    },
    isActionOnHover: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    selectedValue: '',
    slider: '',
    allSections: [],
    singleSectionWidth: '',
    container: '',
  }),
  mounted() {
    if (window.getComputedStyle(this.$refs.slider).display === 'none') {
      return;
    }

    let defaultIndex = 0;

    if (this.searchByField !== 'value') {
      defaultIndex = this.sliderData.length - 1;
    }

    this.allSections = this.$refs.slider.querySelectorAll('.slider-container__section');
    this.singleSectionWidth = this.allSections[0].clientWidth;
    this.slider = this.$refs.slider.querySelector('.slider-container__moving-box');
    this.onPeriodHover(defaultIndex);
  },
  methods: {
    onPeriodHover(index) {
      if (this.isMovingBox) {
        const sliderCoords = (this.singleSectionWidth / 2 - this.slider.clientWidth / 2)
          + this.singleSectionWidth * index;
        this.slider.style.left = `${sliderCoords}px`;
      } else {
        this.resetSelectedClasses();
        this.allSections[index].classList.add('selected');
      }
      this.selectedValue = this.sliderData[index];

      this.$emit('onDataSelect', this.selectedValue);
    },
    resetSelectedClasses() {
      this.allSections.forEach((section) => {
        section.classList.remove('selected');
      });
    },
  },
};
</script>

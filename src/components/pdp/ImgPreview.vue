<template>
  <div class="img-preview">
    <div class="md-layout">
      <!-- <div class="md-layout-item md-size-10">
        <div
          class="img-preview__small-img-item"
          :class="{selected: selectedImgPosition === img.position}"
          v-for="(img, index) in imgs"
          track-by="index"
          v-bind:key="index"
        >
          <img
            v-if="img.fileName"
            :src="getImgUrl(img.fileName)"
            @mouseover="onImgHover(img.position)"
          >
        </div>
      </div> -->
      <div class="md-layout-item md-size-90">
        <div class="img-preview__big-img">
          <!-- <img
            v-if="imgs[selectedImgPosition - 1] && imgs[selectedImgPosition - 1].fileName"
            :src="getImgUrl(imgs[selectedImgPosition - 1].fileName)"
            alt="product_img"
          > -->
          <img :src="imgData.url" :alt="imgData.fileName">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import variables from '../../assets/common';

export default {
  name: 'ImgPreview',
  data: () => ({
    selectedImgPosition: 1,
  }),
  props: {
    // imgs: Array,
    imgData: {},
  },
  mounted() {
    // this.sortImgsByPriority();
  },
  methods: {
    // onImgHover(index) {
    //   this.selectedImgPosition = index;
    // },
    // getImgUrl(halfUrl) {
    //   return variables.imgServer + halfUrl;
    // },
    // sortImgsByPriority() {
    //   this.imgs.sort((firstObj, secondObj) => {
    //     if (firstObj.position > secondObj.position) {
    //       return 1;
    //     }
    //     if (firstObj.position < secondObj.position) {
    //       return -1;
    //     }
    //     return 0;
    //   });
    // },
  },
};
</script>

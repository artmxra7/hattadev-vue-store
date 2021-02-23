<template>
      <!-- <SmallTopBanner/> -->
      <div id="main">
        <Header />
        <div class="main-holder">
          <router-view />
        </div>
        <Footer />
      </div>
</template>

<script>
import { mapActions } from 'vuex';
import i18n from '@/i18n';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


export default {
  components: {
    Header,
    Footer,
  },
  data: () => ({
    menuVisible: false,
  }),
  mounted() {
    i18n.locale = 'ID';
    document.title = ' Ayen Store';
  },
  created() {
  },
  methods: {
    ...mapActions(['updateCartItems']),
  },
  watch: {
    $route(newRoute, oldRoute) {
      if (newRoute.path !== oldRoute.path) {
        const scrolls = document.querySelectorAll('.md-scrollbar');
        scrolls.forEach((scrollItem) => {
          if (scrollItem.scrollTop) {
            // eslint-disable-next-line no-param-reassign
            scrollItem.scrollTop = 0;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "~sweetalert2/src/variables";
$swal2-background: #fff;
@import "~sweetalert2/src/sweetalert2";
</style>

<template>
  <div
    class="cookie-banner"
    v-if="isVisible"
  >
    <p class="flex__stretch">
      {{$t('cookieBanner.text')}}
    </p>
    <div class="cookie-banner__buttons">
      <md-button
        class="flex__no-stretch cookie-banner__accept radius-block mar-l-2"
        @click="onAccept()"
      >
        {{$t('cookieBanner.accept')}}
      </md-button>
      <md-button
        class="flex__no-stretch round-btn mar-l-1 flex flex_align-center"
        @click="isVisible = false"
      >
        <span class="md-icon">close</span>
      </md-button>
     </div>
  </div>
</template>

<script>
export default {
  name: 'CookieBanner',
  data: () => ({
    isVisible: true,
  }),
  created() {
    if (localStorage.getItem('isCookieAccepted')) {
      this.isVisible = false;
    }
  },
  methods: {
    onAccept() {
      this.isVisible = false;
      localStorage.setItem('isCookieAccepted', true);
    },
  },
};
</script>

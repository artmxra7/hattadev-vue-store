<template>
  <div class="container">
    <div class="mar-b-3">
      <!--src="../assets/bg-404.jpg"-->
      <img
        src="https://media.giphy.com/media/Rbt3HJ6pSpyco/giphy.gif"
        alt="404"
      >
    </div>
    <h2 class="mar-b-3">Halaman tidak di temukan</h2>
    <div class="md-layout md-alignment-center">
      <router-link to="/" tag="button">
      <button
        class="header__cart"
      >
        Kembali
      </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
};
</script>

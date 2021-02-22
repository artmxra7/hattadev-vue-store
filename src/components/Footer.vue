<template>
   <footer class="footer">
     <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="footer__content">
              <h6 class="footer__copyright">
                © 2020 QuickCart
                <span>Create by
                  <a href="https://themeforest.net/user/dmitryvolkov/portfolio" target="_blank">Dmitry Volkov</a></span>
              </h6>

              <div class="footer__social">
                <a class="facebook" href="#"><i class="ion ion-logo-facebook"></i></a>
                <a class="instagram" href="#"><i class="ion ion-logo-instagram"></i></a>
                <a class="twitter" href="#"><i class="ion ion-logo-twitter"></i></a>
                <a class="vk" href="#"><i class="ion ion-logo-vk"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
   </footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    isModalVisible: false,
  }),
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

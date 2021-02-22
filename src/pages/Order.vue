<template>
  <section class="section" id="profile">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-12">
          <h3 class="name__style">Daftar Order</h3>
          <div class="cart_profile" v-for="item in dataOrder" :key="item.id">
            <div class="col-12 col-lg-12">
              <div class="row">
                <div class="col-md-12">
                  <h3 class="title title-up">Detail Order</h3>
                </div>
                <div class="col-sm-12  col-lg-6 pb-5">
                  <div class="row">
                    <div class="col-sm-5 pb-1 text-left"><b>Nomor Order :</b></div>
                    <div class="col-sm-7 pb-1 text-left">{{item.user_order_code}}</div>
                    <div class="col-sm-5 pb-1 text-left"><b>Nama Penerima :</b></div>
                    <div class="col-sm-7 pb-1 text-left">{{item.nama}}</div>
                    <div class="col-sm-5 pb-1 text-left"><b>Telepon Penerima :</b></div>
                    <div class="col-sm-7 pb-1 text-left">{{item.nomor_hp}}</div>
                    <div class="col-sm-5 pb-1 text-left"><b>Ekspedisi :</b></div>
                    <div class="col-sm-7 pb-1 text-left">{{item.ekspedisi_kirim}}</div>
                  </div>
                </div>
                <div class="col-sm-12  col-lg-6">
                  <div class="row">
                    <div class="col-sm-5 pb-1 text-left"><b>Status :</b></div>
                    <div class="col-sm-7 pb-1 text-left">{{item.transaction_status}}</div>
                    <div class="col-sm-5 pb-1 text-left"><b>Total Harga :</b></div>
                    <div class="col-sm-7 pb-1 text-left">{{ item.transaction_total | currency}}</div>
                  </div>
                </div>

                <!-- <div class="col-sm-12  col-lg-6">
                  <button class="header__cart">
                    <img src="../assets/svg-icons/writing.svg" alt="signIn icon" />
                    <span>Detail</span>
                  </button>
                </div> -->
                <div class="col-md-12">
                  <h3 class="title title-up">Alamat Pengiriman</h3>
                  <p>
                   {{item.alamat_kirim}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

import variables from '../assets/common';
import authRequestMixin from '../mixins/authRequestMixin';

export default {
  name: 'Order',
  mixins: [authRequestMixin],
  data: () => ({
    showAllMenu: false,
    dataOrder: [],
  }),

  created() {
    this.fetchOrder();
  },
  methods: {
    fetchOrder() {
      const token = localStorage.getItem('contextToken');
      axios
        .get(`${variables.server}/user/transaksi`, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.dataOrder = response.data.data;
        })
        .catch((e) => {
        //   this.errorHandler('On get customer by id', e);
          console.log('=======================================>>>', e);
        });
    },
    handleShowAllMenu() {
      this.showAllMenu = true;
    },
  },
};
</script>

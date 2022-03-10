<template>
    <div id="app">
      <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#couponCreate">
            建立優惠卷
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">
                截止日期
              </th>
              <th>優惠卷標題</th>
              <th width="100">
                折扣
              </th>
              <th width="100">
                代碼
              </th>
              <th width="100">
                是否啟用
              </th>
              <th>
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for=" item in coupon.coupons" :key="item.due_date + '123'">
              <td>{{new Date(item.due_date) }}</td>
              <td>{{item.title}}</td>
              <td class="">{{item.percent}}</td>
              <td class="">{{item.code}}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" id="edit"  data-bs-toggle="modal" data-bs-target="#couponCreate" >
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#delProductModal">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="couponCreate" ref="couponCreate" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
     <coupon-create v-on:get-coupon="getCoupon" :get-coupon-data="coupon"></coupon-create>
    </div>
</template>

<script>
import couponCreate from '@/components/couponCreateModal.vue';
export default {
  data () {
    return {
      coupon: {}
    };
  },
  components: {
    couponCreate
  },
  methods: {
    getCoupon () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`)
        .then(res => {
          this.coupon = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted () {
    this.getCoupon();
  }
};
</script>

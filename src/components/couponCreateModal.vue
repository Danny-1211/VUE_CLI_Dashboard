<template>
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span>編輯</span>
            </h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-8">
                <div class="row">
                  <div class="mb-4 col-md-6">
                    <label for="category" class="form-label">日期</label>
                    <input id="category" type="date" class="form-control" placeholder="請輸入日期">
                  </div>
                  <div class="mb-4 col-md-6">
                    <label for="price" class="form-label">折扣(%)</label>
                    <input id="unit" type="number" class="form-control" placeholder="請輸入數字(0~100)">
                  </div>
                   <div class="mb-4 col-md-6">
                    <label for="price" class="form-label">標題</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入優惠卷標題">
                  </div>
                  <div class="mb-4 col-md-6">
                    <label for="price" class="form-label">代碼</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入優惠卷代碼">
                  </div>
                  <div class="mb-4 col-md-6">
                    <label for="price" class="form-label">數量</label>
                    <input id="unit" type="number" class="form-control" placeholder="請輸入優惠卷數量">
                  </div>
                </div>
                  <div class="mb-4 col-md-6">
                   <div class="form-check">
                      <input id="is_paid" class="form-check-input" type="checkbox">
                      <label class="form-check-label" for="is_paid">是否啟用</label>
                   </div>
                  </div>
                <hr>
             </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary"  data-bs-dismiss="modal">
              確認
            </button>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: ['getCouponData'],
  data () {
    return {
      couponCreate: this.getCouponData
    };
  },
  watch: {
    getCouponData: function () {
      if (this.getCouponData.due_date !== this.couponCreate.due_date) {
        this.couponCreate = this.getCouponData;
      }
    }
  },
  methods: {
    updateCoupon () {
    //   this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.couponCreate.coupons.id}`, { data: this.couponCreate })
    //     .then(res => {
    //       console.log(res);
    //       alert('修改成功');
    //       this.getCoupon();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       alert('修改失敗');
    //     });
    },
    getCoupon () {
      this.$emit('get-coupon');
    },
    addCoupon () {
      // this.couponCreate.due_date = new Date(this.couponCreate.due_date).getTime() / 1000;
      // this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`, { couponCreate })
      //   .then(res => {
      //     console.log(res);
      //     alert('新增成功');
      //     this.getCoupon();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     alert('新增失敗');
      //   });
    }
  },
  mounted () {
  }
};
</script>

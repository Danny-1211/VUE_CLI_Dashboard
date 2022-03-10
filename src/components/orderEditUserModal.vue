<template>
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span>訂單編輯</span>
            </h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-8">
                <div class="row" v-if="tempData.user">
                  <div class="mb-4 col-md-6">
                    <label for="category" class="form-label">Email</label>
                    <input id="category" type="email" class="form-control" placeholder="請輸入信箱" v-model="tempData.user.email">
                  </div>
                  <div class="mb-4 col-md-6">
                    <label for="price" class="form-label">名字</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入名字" v-model="tempData.user.name" >
                  </div>
                   <div class="mb-4 col-md-6">
                    <label for="price" class="form-label">電話</label>
                    <input id="unit" type="tel" class="form-control" placeholder="請輸入電話" v-model="tempData.user.tel">
                  </div>
                  <div class="mb-4 col-md-6">
                    <label for="title" class="form-label">地址</label>
                    <input id="title" type="text" class="form-control" placeholder="使用者地址" v-model="tempData.user.address">
                  </div>
                </div>
                  <div class="mb-4 col-md-6">
                   <div class="form-check">
                      <input id="is_paid" class="form-check-input" type="checkbox" v-model="tempData.is_paid">
                      <label class="form-check-label" for="is_paid">是否付款</label>
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
            <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" @click="updateOrder">
              確認
            </button>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: ['orderTemp'],
  data () {
    return {
      tempData: this.orderTemp
    };
  },
  watch: {
    orderTemp: function () { // 監聽props的值是否有改變
      if (this.tempData.id !== this.orderTemp.id) {
        this.tempData = this.orderTemp;
      }
    }
  },
  methods: {
    getOrderData () {
      this.$emit('order-data');
    },
    updateOrder () {
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempData.id}`, { data: this.tempData })
        .then(res => {
          alert('修改成功');
          this.getOrderData();
        })
        .catch(err => {
          console.log(err);
          alert('修改失敗');
        });
    }
  }
};
</script>

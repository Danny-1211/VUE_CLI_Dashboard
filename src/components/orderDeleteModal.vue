<template>
    <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除訂單
            <strong class="text-danger"></strong>(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteOrder">
              確認刪除
            </button>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: ['deleteData'],
  data () {
    return {
      tempData: this.deleteData
    };
  },
  watch: {
    deleteData: function () { // 監聽props的值是否有改變
      if (this.tempData.id !== this.deleteData.id) {
        this.tempData = this.deleteData;
      }
    }
  },
  methods: {
    getOrder () {
      this.$emit('get-order');
    },
    deleteOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempData.id}`;
      this.$http.delete(url)
        .then(res => {
          alert('刪除成功');
          this.getOrder();
        }).catch(err => {
          console.log(err);
          alert('刪除失敗');
        });
    }
  }
};
</script>

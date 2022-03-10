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
            是否刪除
            <strong class="text-danger"></strong> {{deleteTempData.title}}(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="btnAction">
              確認刪除
            </button>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: ['tempData'],
  data () {
    return {
      deleteTempData: JSON.parse(JSON.stringify(this.tempData))
    };
  },
  watch: {
    tempData: function () {
      if (this.tempData.id !== this.deleteTempData.id) {
        this.deleteTempData = this.tempData;
      }
    }
  },
  methods: {
    deleteData () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.deleteTempData.id}`;
      this.$http.delete(url)
        .then(res => {
          alert('刪除成功');
          this.getProduct();
        }).catch(err => {
          console.log(err);
          alert('刪除失敗');
        });
    },
    getProduct () {
      this.$emit('get-product');
    },
    btnAction () {
      this.$emit('btn-action');
    }
  }
};
</script>

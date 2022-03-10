<template>
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span>新增產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control" v-model="tempdataModal.imageUrl"  placeholder="請輸入圖片連結">
                    <img class="img-fluid"  v-bind:src="tempdataModal.imageUrl" alt="">
                  </div>
                  <div class="mb-3">
                      <h3>放入副圖</h3>
                          <template v-for=" (img,index) in tempdataModal.imagesUrl" :key="index+'1211'">
                            <input type="text" class="form-control" v-model="tempdataModal.imagesUrl[index]" placeholder="請輸入圖片連結">
                            <img class="img-fluid" v-bind:src="tempdataModal.imagesUrl[index]" alt="">
                          </template>
                  </div>
                </div>
                <div>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempdataModal.imagesUrl.push()">
                    新增圖片
                  </button>
                </div>
                <div >
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempdataModal.imagesUrl.pop()">
                    刪除最後一張圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" v-model="tempdataModal.title" placeholder="請輸入標題">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control" v-model="tempdataModal.category" placeholder="請輸入分類">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control" v-model="tempdataModal.unit" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" type="number" min="0" class="form-control" v-model="tempdataModal.origin_price" placeholder="請輸入原價">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" type="number" min="0" class="form-control" v-model="tempdataModal.price" placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" type="text" class="form-control" v-model="tempdataModal.description" placeholder="請輸入產品描述">
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="description" type="text" class="form-control" v-model="tempdataModal.content" placeholder="請輸入說明內容">
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox" v-model="tempdataModal.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="btnAction" data-bs-dismiss="modal">
              確認
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
      tempdataModal: this.tempData // 用一個變數將props抓到的外層資料儲存下來，避免單向數據流(不能修改父元件資料)的錯誤
    };
  },
  watch: {
    tempData: function () {
      if (this.tempData.id !== this.tempdataModal.id) {
        this.tempdataModal = this.tempData;
      }
    }
  },
  methods: {
    updateProduct () {
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempdataModal.id}`, { data: this.tempdataModal })
        .then(res => {
          console.log(res);
          alert('修改成功');
          this.getProduct();
        })
        .catch(err => {
          console.log(err);
          alert('修改失敗');
        });
    },
    getProduct () {
      this.$emit('get-product');
    },
    addData () { // 可惡，看了一天想說到底哪裡錯，結果我把 http 寫成 htpp 紀錄一下這可恨的手殘T_T 3/6
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`, { data: this.tempdataModal })
        .then(res => {
          console.log(res);
          this.getProduct();
          alert('新增成功');
        })
        .catch(err => {
          console.log(err);
          alert('新增失敗');
        });
    },
    btnAction () {
      this.$emit('btn-action');
    }
  }
};
</script>

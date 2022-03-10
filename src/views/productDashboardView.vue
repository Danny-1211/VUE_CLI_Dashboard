<template>
    <div id="app">
      <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" @click="openModal('new')" >
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">
                分類
              </th>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="100">
                是否啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for=" item in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{item.title}}</td>
              <td class=""> {{item.origin_price}}</td>
              <td class="">{{item.price}}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" id="edit" @click="openModal('edit',item)" data-bs-toggle="modal" data-bs-target="#productModal" >
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#delProductModal" @click="openModal('delete',item)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <pagination-bar :page="pagination" @get-product="getProducts" ></pagination-bar>
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
           <modal :temp-data="tempData"  v-on:get-product="getProducts" v-on:btn-action="btnMethod"  ref="modal" ></modal>
    </div>
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"  aria-labelledby="delProductModalLabel" aria-hidden="true">
        <delete-modal :temp-data="tempData" ref="deleteModal" v-on:get-product="getProducts" v-on:btn-action="btnMethod"></delete-modal>
    </div>
</template>

<script>
import modal from '@/components/editOrAddModal.vue';
import deleteModal from '@/components/deleteModal.vue';
import paginationBar from '@/components/paginationBar.vue';
export default {
  data () {
    return {
      products: [],
      tempData: { imagesUrl: [] },
      statusNumber: 0,
      pagination: {}
    };
  },
  methods: {
    getProducts (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then(res => {
          this.pagination = res.data.pagination;
          this.products = res.data.products;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openModal (ch, item) { // 確認是按到新增、編輯、按鈕
      if (ch === 'new') {
        this.tempData = {
          imagesUrl: []
        };
        this.statusNumber = 1;
      } else if (ch === 'edit') {
        this.tempData = { ...item };
        this.statusNumber = 2;
      } else if (ch === 'delete') {
        this.tempData = { ...item };
      }
    },
    btnMethod () { // statusNumber=1 執行新增產品，statusNumber=2 執行編輯功能
      if (this.statusNumber === 1) {
        this.$refs.modal.addData();
        this.statusNumber = 0;
      } else if (this.statusNumber === 2) {
        this.$refs.modal.updateProduct();
        this.statusNumber = 0;
      } else {
        this.$refs.deleteModal.deleteData();
        this.statusNumber = 0;
      }
    }
  },
  components: {
    modal,
    deleteModal,
    paginationBar
  },
  mounted () {
    this.getProducts();
  }
};
</script>

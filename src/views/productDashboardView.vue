<template>
    <div id="app">
      <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary">
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
                  <button type="button" class="btn btn-outline-primary btn-sm" id="edit">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
         <!-- Modal -->
      <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
          <edit-or-add-modal></edit-or-add-modal>
      </div>
      </div>
    </div>
</template>

<script>
import editOrAddModal from '@/components/editOrAddModal.vue';
let AddModal = '';
export default {
  data () {
    return {
      products: []
    };
  },
  methods: {
    getProducts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products`)
        .then(res => {
          console.log(res.data);
          this.products = res.data.products;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    editOrAddModal
  },
  mounted () {
    this.getProducts();
    AddModal = new bootstrap.Modal(document.querySelector('editOrAddModal'));
    AddModal.show();
  }
};
</script>

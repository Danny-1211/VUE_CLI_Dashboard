<template>
    <div id="app">
      <div class="container">
        <div class="text-end mt-4">
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">
                  建立日期
              </th>
              <th>訂單ID</th>
               <th width="100"></th>
              <th width="120">
                付款方式
              </th>
              <th width="100">
                付款狀態
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for=" item in orderData" :key="item.id">
              <td>{{ new Date(item.create_at) }}</td>
              <td>{{item.id}}</td>
              <td class=""> {{ item.payment_method}}</td>
              <td class=""></td>
              <td>
                <span class="text-success" v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" id="edit"  data-bs-toggle="modal" data-bs-target="#orderEditUserModal"  @click="openModal(item)">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#delProductModal" >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="orderEditUserModal" ref="orderEditUserModal" class="modal fade" tabindex="-1" aria-labelledby="orderEditUserModal" aria-hidden="true">
           <order-user-modal :order-temp="tempData" v-on:order-data="getOrderData"></order-user-modal>
    </div>
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"  aria-labelledby="delProductModalLabel" aria-hidden="true">
        <order-delete-modal :delete-data="tempData" v-on:get-order="getOrderData"></order-delete-modal>
    </div>
</template>

<script>
import orderUserModal from '@/components/orderEditUserModal.vue';
import orderDeleteModal from '@/components/orderDeleteModal.vue';
export default {
  data () {
    return {
      orderData: [],
      tempData: []
    };
  },
  methods: {
    getOrderData () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders`)
        .then(res => {
          this.orderData = res.data.orders;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openModal (item) {
      this.tempData = { ...item };
    }
  },
  components: {
    orderUserModal,
    orderDeleteModal
  },
  mounted () {
    this.getOrderData();
  }
};
</script>

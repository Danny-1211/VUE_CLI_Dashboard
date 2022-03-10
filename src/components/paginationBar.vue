<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <!-- class與 style綁定 https://cn.vuejs.org/v2/guide/class-and-style.html-->
            <!--disabled判斷是否有前一頁或後一頁，如果有的話按鈕就點得動-->
            <li class="page-item" :class={disabled:!page.has_pre}>
                <router-link class="page-link" to="/productDashboard"  @click="$emit('get-product' , page.current_page-1)" >Previous</router-link>
            </li>
            <li class="page-item" v-for="item in page.total_pages" :key=" item+ '123' " :class="{active:item === item.current_page}">
                <router-link class="page-link" to="/productDashboard" @click="$emit('get-product' , item)">{{item}}</router-link>
                <!--用 emit接外面的getProduct，參數為item(目前頁數)，getProduct的參數為page=item，所以會抓到目前頁數的產品資料-->
            </li>
            <li class="page-item" :class={disabled:!page.has_next} @click="$emit('get-product' , page.current_page+1)" >
                <router-link class="page-link" to="/productDashboard">Next</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  props: ['page']
//   data () {
//     return {
//       pageData: this.page
//     };
//   },
//   watch: {
//     pageData: function () {
//       if (this.pageData.current_page !== this.page.current_page) {
//         this.pageData = this.page;
//       }
//     }
//   },
//   mounted () {
//     this.pageData = this.page;
//   }
};
</script>

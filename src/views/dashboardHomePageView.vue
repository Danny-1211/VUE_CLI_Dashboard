<template>
    <h1>後台首頁</h1>
    <div class="nab">
        <nav>
            <router-link to="/productDashboard">產品</router-link> |
            <router-link to="/orderDashboard">訂單</router-link> |
            <router-link to="/couponDashboard">優惠卷</router-link>
        </nav>
    </div>
    <router-view v-if="loginCheckStatus"></router-view>
</template>

<script>
export default {
  data () {
    return {
      loginCheckStatus: false
    };
  },
  methods: {
    loginCheck () {
      const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `${myCookie}`; // 每次用api取得資料都自動帶入token
      console.log(myCookie);
      this.$http.post(`${process.env.VUE_APP_API}/api/user/check`, myCookie)
        .then(res => {
          this.loginCheckStatus = true;
        })
        .catch(err => {
          console.log(err);
          alert('無效登入');
          this.$router.push('/');
        });
    }
  },
  mounted () {
    this.loginCheck();
  }
};
</script>

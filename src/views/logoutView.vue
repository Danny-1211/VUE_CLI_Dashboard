<script>
export default {
  methods: {
    logout () {
      this.$http.post(`${process.env.VUE_APP_API}/logout`)
        .then(res => {
          alert('登出成功');
          this.$router.push('/');
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted () {
    this.logout();
  }
};
</script>

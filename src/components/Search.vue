<template>
  <div class="search">
    <form>
      <input type="text" placeholder="请输入商品名称" />
      <button type="submit">
        <img src="@/assets/search.png" alt="搜索">
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'search',
  setup() {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  opacity: 0.8;
  margin: 0 auto;
  margin-top: 22px;
  border-radius: 10px;

  input {
    width: 1020px;
    height: 40px;
    margin-left: 20px;
    margin-top: 6px;
    background-color: #fff;
    opacity: 0.8;
    border-radius: 30px;
    outline: none;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
    border: 0;
    padding-left: 20px;
    font-size: 16px;
  }

  form {
    button {
      position: absolute;
      right: 242px;
      top: 6px;
      width: 45px;
      height: 45px;
      outline: none;
      background-color: transparent;
      border: 0;
      cursor: pointer;

      img {
        height: 20px;
        width: 20px;
      }
    }
  }
}
</style>
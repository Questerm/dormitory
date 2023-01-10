import { createStore } from 'vuex'

export default createStore({
  state: {
    userRole: '',
    userName: '',
    userList: [],
    updateList:[],
    updateListShop: [],
    updateListMarki: [],
    updateListGoods: [],
    shopList: [],
    homeList: [],
    markiList: [],
    orderList: [],
    orderShopList: [],
    orderMarKiList: [],
    commentGoods: [],
    carList: [],
    theGoods: [],
    goodsList: [],
    commentList: [],
    selectedSid: '',
    gid: null,
    shopName: '',
    goodsName: null,
    adminiRole: '用户',
    shopTitle: '我的商品',
    goodsItem: null,
    CommentList: [],
    complaintList: [],
    token: localStorage.getItem('token') || '',
  },
  getters: {
  },
  mutations: {
    updateUserRole(state, userRole) {
      state.userRole = userRole;
    },
    updateUserName(state, userName) {
      state.userName = userName;
    },
    updateUserList(state, userList) {
      state.userList = userList
    },
    updateShopList(state, shopList) {
      state.shopList = shopList
    },
    updateMarkiList(state, markiList) {
      state.markiList = markiList
    },
    updateGoodsList(state, goodsList) {
      state.goodsList = goodsList
    },
    updateOrderList(state, orderList) {
      state.orderList = orderList
    },
    updateOrderShopList(state, orderShopList) {
      state.orderShopList = orderShopList
    },
    updateOrderMarKiList(state, orderMarKiList) {
      state.orderMarKiList = orderMarKiList
    },
    updateCarList(state, carList) {
      state.carList = carList
    },
    updateShopListItem(state, item, index) {
      state.shopList[index] = item;
    },
    updateSelectedSid(state, selectedSid) {
      state.selectedSid = selectedSid
    },
    updateShopName(state, shopName) {
      state.shopName = shopName
    },
    updateAdminiRole(state, adminiRole) {
      state.adminiRole = adminiRole
    },
    updateShopTitle(state, shopTitle) {
      state.shopTitle = shopTitle
    },
    updateToken(state, token) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})

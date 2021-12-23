const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'


new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    cart: [],
    searchLine: '',
    isVisibleCart: false
  },
  methods: {
    loadGoods(){
      fetch(`${API_URL}catalogData.json`)
        .then((request) => request.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    loadCart(){
      fetch(`${API_URL}getBasket.json`)
        .then((request) => request.json())
        .then((data) => {
          this.cart = data.contents;
        })
    },
    addToCart(good){
      fetch(`${API_URL}addToBasket.json`)
        .then(() => {
          this.cart.push(good)
        })
    },
    removeFromCart(good){
      fetch(`${API_URL}deleteFromBasket.json`)
        .then(() => {
          const index = this.cart.findIndex((item) => item.id_product == good.id_product)
          this.cart.splice(index, 1)
        })
    },
    onSearch() {
      const reg = new RegExp(this.searchLine, 'i')
      this.filteredGoods = this.goods.filter((good) => reg.test(good.product_name))
    },
    onToggleCart() {
      this.isVisibleCart = !this.isVisibleCart
    }
  },
  mounted() {
    this.loadGoods();
    this.loadCart();
  }
})
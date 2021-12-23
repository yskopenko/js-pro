const API_URL = 'http://127.0.0.1:3001/'

Vue.component('good-card', {
  template: `
    <div class="good-card" @click="onClick">
      <h2>{{ data.title }}</h2>
      <p>$ {{ data.price }}</p>
    </div>
  `,
  props: ['data'],
  methods: {
    onClick() {
      fetch(`${API_URL}addToCart`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(this.data)
      })
        .then(() => {
          this.$emit('add', this.data)
        })
    }
  }
})

Vue.component('goods-list', {
  template: `
    <div class="goods-list">
      <good-card 
        v-for="good of list" 
        v-bind:key="good.id_product"
        v-bind:data="good"
        v-on:add="onAdd"
      ></good-card>
    </div>
  `,
  props: ['list'],
  methods: {
    onAdd(good) {
      this.$emit('add', good)
    }
  }
})

Vue.component('search', {
  template: `
    <div class="search">
      <input type="text" v-model="searchString" class="goods-search" />
      <button class="search-button" type="button" v-on:click="onClick">Искать</button>
    </div>
  `,
  data() {
    return {
      searchString: ''
    }
  },  
  methods: {
    onClick(){
      this.$emit('search', this.searchString)
    }
  }
})

Vue.component('cart-item', {
  template: `
    <div class="good-card">
      <h2>{{ data.title }}</h2>
      <p>$ {{ data.price }}</p>
      <button v-on:click="onClick">Удалить</button>
    </div>
  `,
  props: ['data'],
  methods: {
    onClick() {
      fetch(`${API_URL}removeFromCart`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(this.data)
      })
        .then(() => {
          this.$emit('delete', this.data)
        })
    }
  }
})

Vue.component('cart', {
  template: `
    <div class="modal">
      <cart-item 
          v-for="good of list" 
          v-bind:key="good.id_product"
          v-bind:data="good"
          v-on:delete="onDelete"
        ></cart-item>
        <button v-on:click="onClose">Закрыть</button>
    </div>
  `,
  props: ['list'],
  methods: {
    onDelete(good) {
      this.$emit('delete', good)
    },
    onClose(){
      this.$emit('close')
    }
  }
})

new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    cart: [],
    isVisibleCart: false
  },
  methods: {
    loadGoods(){
      fetch(`${API_URL}catalogData`)
        .then((request) => request.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    loadCart(){
      fetch(`${API_URL}cart`)
        .then((request) => request.json())
        .then((data) => {
          this.cart = data;
        })
    },
    onSearch(searchString){
      const regex = new RegExp(searchString, 'i');
      this.filteredGoods = this.goods.filter((good) => regex.test(good.title))
    },
    onAdd(good) {
      this.cart.push(good)
    },
    onDelete(good){
      const idx = this.cart.findIndex((item) => item.id === good.id)
      if(idx >= 0) {
        this.cart = [...this.cart.slice(0, idx), ...this.cart.slice(idx + 1)]
      }
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
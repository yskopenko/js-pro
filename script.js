// const goods = [
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
// ];

// const $goodsList = document.querySelector('.goods-list');
  
// const renderGoodsItem = ({ title, price }) => {
//     return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
// };
  
// const renderGoodsList = (list = goods) => {
//     let goodsList = list.map(
//             (item) =>  {
//                 return renderGoodsItem(item)
//             }
//         ).join('');

//     $goodsList.insertAdjacentHTML('beforeend', goodsList);
// }
  
// renderGoodsList();


class GoodsItem {
    constructor(title, price) {
      this.title = title;
      this.price = price;
    }

    render() {
      return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
      this.goods = [];
    }

    fetchGoods() {
        this.goods = [
          { title: 'Shirt', price: 150 },
          { title: 'Socks', price: 50 },
          { title: 'Jacket', price: 350 },
          { title: 'Shoes', price: 250 },
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price);
          listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    
}  

class Cart {
    constructor () {
        this.goods = [];
    }
    //метод добавления товара в корзину
    addCartItem(cartItem) {
        this.goods.push(cartItem);
    }

    //Метод для вывода итоговой суммы корзины
    totalCartPrice() {
        let totalPrice = document.getElementById(''); 
        let sum = 0;
        this.goods.forEach (good => { 
            sum += good.price
        });
        totalPrice.innerText = `Итого ${sum} рублей`;
    }

    render() {
        let listHtml = '';
        let goodsList = document.getElementById('goods-list'); 
        
        this.goods.forEach (good => {
            const goodItem = new GoodsItem (good.title, good.price);
            listHtml += goodItem.render();
        });
        goodsList.innerHTML = listHtml;
    }
}

// class CartItem {
//    constructor(item) { 
//        this.item = item;
//    }


const list = new GoodsList();
list.fetchGoods();
list.render();
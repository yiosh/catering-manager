Vue.component('content-container', {
  data() {
    return {
      sectionTitle: 'Stewarding',
      show: false,
      categories: [
        {
          id: 0,
          title: 'Chairs',
          total: 0,
          show: false,
          products: [
            {
              id: 0,
              name: 'White chair',
              quantity: 2,
              price: 10
            },
            {
              id: 1,
              name: 'Brown chair',
              quantity: 3,
              price: 20
            }
          ]
        },
        {
          id: 1,
          title: 'Table',
          total: 0,
          show: false,
          products: [
            {
              id: 0,
              name: 'White table',
              quantity: 2,
              price: 10
            },
            {
              id: 1,
              name: 'Brown table',
              quantity: 3,
              price: 20
            }
          ]
        },
        {
          id: 2,
          title: 'Napkins',
          total: 0,
          show: false,
          products: [
            {
              id: 0,
              name: 'White napkin',
              quantity: 2,
              price: 10
            },
            {
              id: 1,
              name: 'Brown napkin',
              quantity: 3,
              price: 20
            }
          ]
        }
      ]
    }
  },
  template: `
    <div class="content">
      <div class="content-container container">
        <div class="columns">
          <div class="title column">
            {{ sectionTitle }}
          </div>
          <div class="title column">
            {{ sectionTotal }}€
          </div>
        </div>
        <div class="category section" v-for="category in categories" :key="category.title">
          <div class="category-container container">
            <div class="columns" @click="category.show = !category.show">
              <div class="title column">
                {{ category.title }}
              </div>
              <div class="title column">
                {{ category.total }}€
              </div>
            </div>
            
            <table v-show="category.show" class="table is-responsive">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
              </tr>
              <tr is="product" v-for="product in category.products" v-on:saved-product="categoryTotal()" :product="product" :key="product.name"></tr>
              
            </table>

            
          </div>
        </div>
      </div>
    </div>
  `,
  computed: {
    sectionTotal() {
      let total = 0;
      this.categories.forEach(category => {
        total += category.total;
      });
      return total;
    }
  },
  methods: {
    categoryTotal() {
      this.categories.forEach((category, index) => {
        let productsArray = [];
        let total = 0;
        category.products.forEach(product => {
          productsArray.push(product.quantity * product.price);
        });
        productsArray.forEach(amount => {
          total += amount;
        });
        this.categories[index].total = total;
      });
    }
  },
  created() {
    this.categories.forEach((category, index) => {
      let productsArray = [];
      let total = 0;
      category.products.forEach(product => {
        productsArray.push(product.quantity * product.price);
      });
      productsArray.forEach(amount => {
        total += amount;
      });
      this.categories[index].total = total;
    });
  }
});

Vue.component('product', {
  props: ['product'],
  template: `
    <tr>
      <td>{{ product.name }}</td>
      <td>{{ product.quantity }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.quantity * product.price }}</td>
      <td><button @click="show = !show">Modify</button></td>
      <div class="modal is-active" v-show="show">
        <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Modal title</p>
              <button @click="show = !show" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body columns">
              <div class="column">
                <label class="label" for="quantity">Quantity</label>
                <input class="input" name="quantity" v-model="product.quantity">
              </div>
              <div class="column">
                <label class="label" for="price">Price</label>
                <input class="input" name="price" v-model="product.price">
              </div>
            </section>
            <footer class="modal-card-foot">
              <button @click="saved" class="button is-success">Save changes</button>
              <button @click="show = !show" class="button">Cancel</button>
            </footer>
          </div>
        </div>
    </tr>
  `,
  data() {
    return {
      count: 0,
      show: false
    }
  },
  methods: {
    saved() {
      this.$emit('saved-product');
      this.show = !this.show;
    }
  }
});

let vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello'
  }
});
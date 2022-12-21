<template>
<div>
 <nav class="navbar is-info" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    
    <a class="navbar-item" >
      <span class="icon-text has-text-warning">
        <span><h1 class="title is-4 has-text-warning">CARENT</h1></span>
        <span class="icon is-medium	">
          <font-awesome-icon icon="fa-solid fa-car-side" />
        </span>
      </span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      
      <a class="navbar-item">
        <router-link to="/order" class="has-text-white">
        <span>Order</span>
        </router-link>
      </a>

      <a class="navbar-item">
        <router-link to="/cars/getAllCars" class="has-text-white">
          <span>Our Car</span>
        </router-link>
      </a>

      <a class="navbar-item">
        <router-link to="/payments/getAllPayments" class="has-text-white">
          <span>Payment</span>
        </router-link>
      </a>

    

    </div>

    <div class="navbar-end">
      <div class="navbar-item" v-if="user && !isLogin() ">
        <div class="buttons">
          <a class="button is-primary">
            <router-link to="/admin/signUp">
            <strong>Sign up</strong>
        </router-link>
          </a>
          <a class="button is-light">
            <router-link to="/admin/logIn">
            Log in
          </router-link>
          </a>
        </div>
      </div>
    </div>

    <div >
      <div class="navbar-item" v-if="!user"   >
        <div class="buttons">
          <a class="button is-light"  @click="logout()">
            Log out
          </a>
        </div>
      </div>
    </div>

  </div>
  </nav>
    <!-- <h1>All Payment</h1> -->
    <div class="box">
        <div class="content">
            <center>
                <h3>All Payment
                    <!-- <button class="button is-small is-link is-rounded" aria-haspopup="true" aria-controls="dropdown-menu3" style="padding-left: 1em; padding-right: 1em;" @click="modalAddCar = !modalAddCar">
                        <span class="icon is-medium">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </span>
                    </button> -->
                </h3>
            </center>

            <table class="table is-hoverable">
                <thead class="has-background-primary">
                    <tr>
                        <th>PaymentId</th>
                        <th>OrderId</th>
                        <th>ชื่อ-นามสกุล (Customer Name)</th>
                        <th>อีเมล (Email)</th>
                        <th>วัน-เวลาที่ชำระเงิน (DateTime Payment)</th>
                        <th>จำนวนเงิน (Total Price)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="has-background-primary-light">
                    <tr v-for="payment in payments" v-bind:key="payment._id">
                        <td>{{ payment._id }}</td>
                        <td>{{ payment.orderId }}</td>
                        <td>{{ payment.cusName }}</td>
                        <td>{{ payment.email }}</td>
                        <td>{{ payment.datetime }}</td>
                        <td>{{ payment.totalPrice }}</td>
                        <td>
                            <button class="button is-small is-danger is-rounded" aria-haspopup="true" aria-controls="dropdown-menu3" style="padding-left: 1em; padding-right: 1em;" @click="delPaymentConfirm(payment._id)">
                                <span class="icon is-medium">
                                    <font-awesome-icon icon="fa-solid fa-trash" />
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Modal Delete -->
        <div class="modal" v-bind:class="{'is-active' : modalDelPayment}">
            <div class="modal-background" @click="modalDelPayment = !modalDelPayment"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Delete Evidence of Payment</p>
                    <button class="delete" aria-label="close" @click="modalDelPayment = !modalDelPayment"></button>
                </header>
                <section class="modal-card-body">
                    <div class="column">
                        <p>Are you sure you want to delete Payment Id : {{ delPaymentId }}</p>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-danger" @click="delPayment(delPaymentId)">Delete</button>
                    <button class="button" @click="modalDelPayment = !modalDelPayment">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
   </div>
</template>

<script>
import axios from '@/plugins/axios'

export default{
    data(){
        return{
            payments: [],
            delPaymentId: '',
            // updatePaymentId: '',
            // updateOrderId: '',
            // updateCusName: '',
            // updateEmail: '',
            // updateDatetime: '',
            // updateTotalPrice: '',
            // updateStatus: '',
            modalDelPayment: false,
            user: true,
        }
    },
    mounted(){
        this.getAllPayments()
        this.isLogin()
    },
    methods: {
        getAllPayments(){
            axios.get("/payments/getAllPayments")
            .then((res) => {
                this.payments = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        // updateStatusPayment(payment){
        //     this.updatePaymentId = payment._id
        //     this.updateOrderId = payment.orderId
        //     this.updateCusName = payment.cusName
        //     this.updateEmail = payment.email
        //     this.updateDatetime = payment.datetime
        //     this.updateTotalPrice = payment.totalPrice
        //     this.updateStatus = payment.status_payment
        //     this.modalUpdateStatus = true
        // },
        delPaymentConfirm(paymentId){
            this.modalDelPayment = true
            this.delPaymentId = paymentId
        },
        delPayment(delPaymentId){
            console.log(delPaymentId)
            axios
                .delete("payments/delPayment/"+delPaymentId)
                .then((res) => {
                    console.log(res)
                    this.modalDelPayment = false
                    document.location.reload(true);
                })
                .catch((err) => {
                    console.log(err)
                    this.modalDelPayment = false
                })
        },
          logout () {
        localStorage.clear()
        this.user = true
        this.$router.replace({ name: "logIn"}).catch(()=>{});
      },
       isLogin(){
        const token = localStorage.getItem('Token')
      if (token) {
        this.user = false;
        // return this.user;
        console.log('เข้ามาแล้ว')
        console.log(this.user)
        console.log('เข้ามาแล้ว' +localStorage.getItem('Token') )
        console.log("islogin" +this.islogin)
        return true
        }
        return false;
      },
    },
}
</script>

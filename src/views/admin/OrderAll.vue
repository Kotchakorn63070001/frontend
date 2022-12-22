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
    <div class="container-fluid ">
        <div class="content py-5 px-5">
            <!-- <h3>Order</h3> -->
            <div class="columns"  >
                        
               
                <div class="column is-3 pl-6">
                    
                    <div class="select">
                        <select class="select" name="filter" v-model="filter" @change="filterBy(filter)">
                            <option>ทั้งหมด</option>
                            <option>กำลังดำเนินการ</option>
                            <option>ดำเนินการเสร็จสิ้น</option>
                        </select>
                    </div>
                </div>           
                
                <div class="column mx-4">
                          
                </div>
            </div>
            <!-- <div class="control px-5">
                <label class="radio" >
                    <input type="radio" name="sortByStatus" @click="check_pending=true , check_success_deny=false" checked>
                    กำลังดำเนินการ
                </label>
                <label class="radio">
                    <input type="radio" name="sortByStatus" @click="check_pending=false , check_success_deny=true">
                    ดำเนินการเสร็จสิ้น
                </label>
            </div> -->
            <div class="card rounded-3 py-5 px-5 mt-5 " style="width: 96%; margin-left:2%;">
                

                <table class="table is-hoverable" >
                   
                <thead class="has-background-white-bis">
                    <tr>
                        <th>OrderId</th>
                        
                        <th>อีเมลสำหรับติดต่อ (Email)</th>
                        <th>ชื่อลูกค้า (Name)</th>
                        <th>ราคา (Total)</th>
                        <th>สถานะ (Status)</th>
                        
                        <th>Action</th>
                      <th>Confirm Email</th>
                        <th></th>
                       
                    </tr>
                </thead>
                <tbody class="has-background-white" v-for="(order,index) in orderfilter" :key="order._id" >
                    <tr >
                        <td > {{order._id}}</td>
                        <td>{{order.user_mail}}</td>
                        <td>{{order.user_name}}</td>
                        <td>฿{{order.totalPrice}}</td>
                        <td>{{order.status_check}}</td>
                        <td v-if="order.status_check =='Pending'">
                            <div class="columns"  >
                                
                                    <div class="column is-2 mx-4" @click="successStatus(index)" >
                                        <button class="button is-success" ><font-awesome-icon style="width:30px;height:25px"  icon="fas fa-circle-check" /></button>
                                    </div>
                                    <div class="column is-2 mx-4" @click="denyStatus(index)">
                                        <button class="button is-danger"><font-awesome-icon style="width:30px;height:25px"  icon="fas fa-circle-xmark" /></button>
                                    </div>
                            </div>
                           
                        </td>
                        <td v-else></td>
                        <td><button class="button is-info" @click="sendEmail(order,index)">Send Email</button></td>

                        <td><button class="button" @click="showModalDetail(index,order.carId)">Detail</button></td>
                        
                    </tr>
                </tbody>
            </table>
            
            

            </div>
            <!-- Modal Show Detail -->
            <div class="modal" v-bind:class="{'is-active' : modalDetail}"  v-if="carShow.length>0">
            <div class="modal-background" @click="modalDetail = !modalDetail"></div>
            <div class="modal-card" >
                <header class="modal-card-head">
                    <p class="modal-card-title">รายละเอียด</p>
                    <button class="delete" aria-label="close" @click="modalDetail = !modalDetail"></button>
                </header>
                <section class="modal-card-body">
                    <figure class="image ">
                        <img v-bind:src="`data:image/png;base64, ${carShow[0].image.data}`">
                    </figure>
                    <div class="columns"  >
                        
                        <div class="column is-1"></div>    
                        <div class="column is-3 mx-4">
                            <div>Model:</div>
                            <div>Type:</div>
                            
                            <div>dateStart:</div>
                            <div>timeStart:</div>
                            <div>dateEnd:</div>
                            <div>timeEnd:</div>
                            <div>Location:</div>

                        </div>
                        <div class="column mx-4">
                            <div>{{carShow[0].model}}</div>       
                            <div>{{carShow[0].type}}</div>
                            <div>{{orderShow.dateStart}}</div>  
                            <div>{{orderShow.timeStart}}</div>    
                            <div>{{orderShow.dateEnd}}</div> 
                            <div>{{orderShow.timeEnd}}</div> 
                            <div>{{orderShow.location}}</div>   
                            
                              
                        </div>
                    </div>
                           
                </section>
               
            </div>
        </div>
        </div>
    </div>
   </div>
</template>

<script>
import axios from '@/plugins/axios'
import emailjs from 'emailjs-com';
export default {
    data(){
        return{
            cars:[],
            orders:[],
            modalDetail:false,
            orderShow:[],
            carShow:[],
            check_pending:true,
            check_success_deny:false,
            filter:"ทั้งหมด",
            orderfilter:[],
             user: true,
            user_name:"",
            user_mail:"",
            id:"",
        }
    },
    mounted(){
        this.getAllOrders()
        this.getAllCars()
         this.isLogin()
    },
    methods:{
      sendEmail(order, index) {
        this.user_name = this.orders[index].user_name;
        this.user_mail = this.orders[index].user_mail;
        this.id = this.orders[index]._id;
        var templateParams = {
            email : this.user_mail,
            user_name : this.user_name,
            id : this.id
          };
          emailjs.send('service_0nazvow', 'template_lkxyk4c', templateParams, "R1-S3aMadPkVaUqP3")
              .then(function (response)
        {
          console.log(response.status, response.text);
            alert("ส่งอีเมลล์สำเร็จ");
        },function (error){
                console.log("fail", error);
              })
      },
        getAllOrders(){
            axios.get("/order/getAllOrders")
            .then((res) => {
                
                this.orders = res.data
                this.orderfilter = this.orders
               
            })
            .catch((err) => {
                console.log(err)
            })
        },
        getAllCars(){
            axios.get("/cars/getAllCars")
            .then((res) => {
                this.cars = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        selectStatus(status_check,index){
            this.orders[index].status_check == status_check;
        },
        successStatus(index){
            console.log(index+"----12")
            this.orders[index].status_check ="Success"
            axios
            .put("/order/updateStatus/"+`${this.orders[index]._id}`+"/Success")
                .then(() => {
                        
                })
                .catch((error) => alert(error.response.data.message+"put")); 

        },
        denyStatus(index){
            console.log(index+"----12")
            this.orders[index].status_check ="Cancel"
            axios
            .put("/order/updateStatus/"+`${this.orders[index]._id}`+"/Cancel")
                .then(() => {
                        
                })
                .catch((error) => alert(error.response.data.message+"put")); 

        },
        showModalDetail(index,carId){
            
            this.carShow = this.cars.filter((val)=>val._id== carId)
            this.orderShow= this.orders[index]
            this.modalDetail =true

        },
        filterBy(filter){
            if(filter == "ดำเนินการเสร็จสิ้น"){
                this.orderfilter = this.orders.filter((val)=>val.status_check== "Success"||val.status_check=="Cancel")

            }
            else if(filter =="กำลังดำเนินการ"){
                this.orderfilter = this.orders.filter((val)=>val.status_check== "Pending")
            }
            else{
                this.orderfilter =this.orders
            }
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
    }
}
</script>

<style scoped>

</style>

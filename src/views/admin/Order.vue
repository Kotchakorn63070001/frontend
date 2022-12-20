<template>
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
                        <th></th>
                       
                    </tr>
                </thead>
                <tbody class="has-background-white" v-for="(order,index) in orderfilter" :key="order._id" >
                    <tr >
                        <td>{{order._id}}</td>
                        <td>{{order.user_mail}}</td>
                        <td>{{order.user_name}}</td>
                        <td>฿{{order.totalPrice}}</td>
                        <td>{{order.status_check}}</td>
                        <td v-if="order.status_check =='Pending'">
                            <div class="columns"  >
                                
                                    <div class="column is-2 mx-4" @click="successStatus(index)">
                                        <button class="button is-success" ><font-awesome-icon style="width:30px;height:25px"  icon="fas fa-circle-check" /></button>
                                    </div>
                                    <div class="column is-2 mx-4" @click="denyStatus(index)">
                                        <button class="button is-danger"><font-awesome-icon style="width:30px;height:25px"  icon="fas fa-circle-xmark" /></button>
                                    </div>
                            </div>
                           
                        </td>
                        <td v-else></td>
                        <td><button class="button" @click="showModalDetail(index,order.carId)">Detail</button></td>
                        
                    </tr>
                </tbody>
            </table>
            
            

            </div>
            <!-- Modal Show Detail -->
            <div class="modal" v-bind:class="{'is-active' : modalDetail}" v-if="carShow.length>0">
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
</template>

<script>
import axios from '@/plugins/axios'
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
            orderfilter:[]
        }
    },
    mounted(){
        this.getAllOrders()
        this.getAllCars()
    },
    methods:{
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

        }
        

    }
}
</script>

<style scoped>

</style>

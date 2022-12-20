<template>
    <div class="container-fluid has-background-info-light">
      <div class="container is-max-desktop p-5">
            <div class="column pt-6 pl-0 pr-0 ">
                <!-- card cart component แสดงข้อมูลที่อยู่ใน Localstorage ---------------------------------------------->
                <div class="card mb-4">
                    
                    <div class="card-content py-5 content">
                        <center><h4 class="pt-2"> รายละเอียดการเช่ารถ</h4></center>
                        
                        <div class="columns"  v-for="car in cars" :key="car._id">
                            <div  class="column is-1 content"></div>
                            <div class="column is-3 content">
                               
                                <h6>รายละเอียดรถ</h6>
                                <p>Model Car:</p>
                                <p>Brand Car:</p>
                                <p>Type Car</p>
                                
                                <h6>รายละเอียดรถ</h6>
                                <p>วันที่รับรถ:</p>
                                <p>เวลาที่รับรถ:</p>
                                <p>วันที่คืนรถ:</p>
                                <p>เวลาที่คืนรถ:</p>
                                <p>สถานที่นัดรับ-คืนรถ:</p>

                                <h6 class="pt-5">ราคารวม:</h6>

                            </div>
                            <div class="column  content">
                                <h6 class="py-2"></h6>
                                
                                <p>{{car.model}}</p>
                                <p>{{car.brand}}</p>
                                <p>{{car.type}}</p>
                                <h6 class="pb-5"></h6>
                                <p>{{order_dateStert}}</p>
                                <p>{{order_timeStart}}</p>
                                <p>{{order_dateEnd}}</p>
                                <p>{{order_timerEnd}}</p>
                                
                                <p>{{order_detail}}</p>

                                <h6 >{{car.price*order_amountDay}}</h6>
                                
                                
                            </div>

                        </div>
                        <center><h5 class="pt-2 has-text-danger">**** กรุณาดูรายละรายเอียดให้ครบถ้วนก่อนกดยืนยัน ****</h5></center>
                    </div>
                </div>

            </div>
            
            <h1 class="is-size-4">User Info</h1>
            <br>




            <!-- Form Column --------------------------------------- -->
            <div class="columns">
                 <!-- <div class="column is-1">
                </div> -->
                <div class="column is-3">
                    <label class="label py-2">ชื่อลูกค้า</label>
                    <label class="label py-2">อีเมลสำหรับติดต่อ</label>
                    <!-- <label class="label py-2">เบอร์โทรสำหรับติดต่อ</label> -->
                    
                </div>
                <div class="column">
                    
                    <div class="control py-1">
                        <input class="input" type="text"  v-model="user_name">
                    </div>
                    <div class="control py-1">
                        <input class="input" type="email"  v-model="user_email">
                    </div>
                    <!-- <div class="control py-1">
                        <input class="input" type="tel"  v-model="user_tel">
                    </div> -->
                </div>
                
            </div>



            <!-- click this button to open Order modal ----------------- -->
           
            <div class="columns pt-3 is-10">
                <div class="column">
                     <router-link :to ="{name: 'backToSelectCar', params: { order_carId: this.order_carId ,type:this.cars[0].type,timeStart:this.order_timeStart,timeEnd:this.order_timerEnd,dateStart:this.order_dateStert,dateEnd:this.order_dateEnd,location:this.order_detail}}">
                    <span class="icon is-large mr-6 " >
                        
                       <font-awesome-icon style="width:250px;height:25px" icon="fas fa-arrow-circle-left" />
                    </span></router-link>
                </div>
                <div class="column is-8 pt-5 ml-6"></div>
                 <div class="column">
                    
                     <button class="button" @click="confirmOrder()">ยืนยันการเช่ารถ</button>
                   
                  
                </div>
  
            </div>

        </div>
    </div>
       
        
               
</template>


<script>
import axios from '../plugins/axios';


export default {
    // props:[this.$route.params],
    
    
    data(){
        return{
            cars: [],

            //location-Date
            order_detail:this.$route.params.location,
            order_timeStart:this.$route.params.timeStart,
            order_timerEnd:this.$route.params.timeEnd,
            order_dateStert:this.$route.params.dateStart,
            order_dateEnd:this.$route.params.dateEnd,
           
            order_carModel:this.$route.params.location,
           
            order_carPrice:"",
            order_carId:this.$route.params.car_id,
            order_amountDay:this.$route.params.amountDay,
            user_name:"",
            user_email:"",
            user_tel:"",
           
           
        }
    },
    mounted(){
        this.getAllCars()        
    },
    
    methods: {
        getAllCars(){
            axios.get("/order/getAllCars")
            .then((res) => {
                this.cars = res.data.filter((val)=>this.order_carId==val._id)
               
            })
            .catch((err) => {
                console.log(err)
            })
        },
        confirmOrder(){
            if(this.user_name ==""){
                 alert('กรุณากรอกชื่อลูกค้า');
            }
            else if(this.user_email==""){
                 alert('กรุณากรอกอีเมล์ในการติดต่อ');
            }
            // else if(this.user_tel==""){
            //     alert('กรุณากรอกเบอร์โทรศัพท์ในการติดต่อ');
            // }
            //แก้เพิ่ม
            else{
                const formData = new FormData();
                formData.append("carId", this.order_carId)
                formData.append("timeStart",  this.order_timeStart.toString())
                formData.append("timeEnd",  this.order_timerEnd.toString())
                formData.append("dateStart", this.order_dateStert.toString())
                formData.append("dateEnd",  this.order_dateEnd.toString())
                formData.append("location", this.order_detail)
                formData.append("totalPrice",  parseInt(parseInt(this.cars[0].price)*this.$route.params.amountDay))
                formData.append("user_name", this.user_name)
                formData.append("user_mail", this.user_email)
                axios
                    .post("/order/addOrder", formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                    .then(() => {})
                    .catch((error) => alert(error.response.data.message+"Post"));
                 axios
                    .put("/order/updateQuantity/"+`${this.order_carId}`)
                    .then(() => {
                        this.$router.push({name: 'selectCar'})
                         alert("ดำเนินการเสร็จสิ้น")
                    })
                    .catch((error) => alert(error.response.data.message+"put")); 
            }
        }       
    },
}
</script>

<style scoped>
</style>
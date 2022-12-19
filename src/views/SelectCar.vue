<template>
    <div class="container-fluid ">
      
       
        <div class="card rounded-3 py-5 px-5 mt-5 " style="width: 60%; margin-left:20%;min-width:500px">
            <div class="content">
                <h2 >เลือกรถ</h2>
                
                <div class="container pb-3">
                    <div class="columns ">
                        <div class="column">
                            <h6>Type:</h6>
                        </div>
                        <!-- <div class="column">
                            <h6>Brand:</h6>
                        </div> -->
                    </div>
                    <div class="columns " style="margin-top:-5%">
                        <div class="column">
                            <div class="select">
                                <select class="select" name="type" v-model="order_carType"  @change="selectType(order_carType)">
                                    <option  v-for="type in getOnlyType" v-bind:key="type">{{type.type}}</option>
                                </select>
                            </div>
                        </div>
                        <!-- <div class="column">
                            <div class="select">
                                <select class="select" name="model" v-model="order_carBrand">
                                    <option  v-for="brand in getOnlyBrand" v-bind:key="brand">{{brand.brand}}</option>
                                </select>
                            </div>
                        </div> -->
                    </div>
                    

                </div>
                <div class="content">
                    <h6>Model:</h6>
                    <div class="columns is-multiline">
                        <!-- <div v-if="order_carType!==''"></div> -->
                        <div class="column is-4 " v-for="car in carByType" v-bind:key="car">

                            <div class="card is-hoverable" @click="selectModel(car._id,car.model)"  :style="{ border: car._id==order_carId ? '3px solid red' : '5px solid white'}"  >
                                <!-- <div :class="[car._id==order_carId ? has-background-danger : '', has-background-light]" > -->
                                 <figure class="image is-256x256 ">
                                    <img v-bind:src="`data:image/png;base64, ${car.image.data}`">
                                </figure>
                                    
                                <div class="px-5 py-5">
                                    <h5><span class="has-text-weight-medium">{{car.model}}</span><span style="margin-left:20px;" class="is-size-7 has-text-danger">{{car.brand}}</span></h5>
                                       
                                    <div class="small">
                                        <div>รองรับได้สูงสุด {{car.numOfSeat}} คน</div>
                                        <div>ราคา {{car.price}} บาทต่อวัน</div>
                                    </div>
                                </div>
                                </div>
                            <!-- </div> -->

                            </div>
                        </div>
                    </div>
                </div>
                <div class="content">
            <h3 class="pb-2 columns">เลือกวันที่-เวลา</h3>
            <label class="pl-6 " > วันรับรถ : </label><input type="date" v-model="order_dateStert"/>
            <label class="pl-5 " > วันคืนรถ : </label><input type="date" v-model="order_dateEnd"/>
       
            <!-- <h6 class="py-2">เลือกเวลา</h6> -->
            <label class="pl-5"> เวลารับรถ : </label><input type="time" v-model="order_timeStart"/>
            <label class="pl-5"> เวลาคืนรถ : </label><input type="time" v-model="order_timerEnd"/>
            
            <h3 class="py-2">สถานที่นัดรับ</h3>
            <div >
                
                <div class="select">
                    <select class="select" name="location" v-model="order_detail">
                        <option  v-for="location in locations" v-bind:key="location._id">{{location.detail}}</option>
                    </select>
                </div>
            </div>
              
            </div>
            <div class="columns pt-3 is-10">
                <!-- <div class="column">
                     <router-link to="/">
                    <span class="icon is-large mr-6 mt-5" >
                        
                       <font-awesome-icon style="width:250px;height:25px" icon="fas fa-arrow-circle-left" />
                    </span></router-link>
                </div> -->
                <div class="column is-10"></div>
  
                <div class="column">
                    <div @click="Confirm()">
                        <!-- <router-link :to="{ name: 'showDetail', params: { car_id: this.order_carId }}"> -->
                    <span class="icon is-large ml-6 mt-5" >
                       <font-awesome-icon style="width:250px;height:25px" icon="fas fa-arrow-circle-right" />
                    </span>
                    <!-- </router-link> -->
                    </div>
                </div>
            </div>
            
           
              
           
            <div></div>
            
          
        </div></div>
        
     
    
</template>


<script>
import axios from '../plugins/axios';


export default {
    
    data(){
        return{
            cars: [],
            test: true,
            //location-Date
            order_detail:"",
            order_timeStart:"",
            order_timerEnd:"",
            order_dateStert:"",
            order_dateEnd:"",
            //
            order_carType:[],
            order_carBrand:"",
            order_carModel:"",
            order_carNumOfSeat:"",
            order_carPrice:"",
            order_carQuantity:"",
            order_carId:"",

            check_model:false,
            old_Model:"",
            car_type:[],
            car_Brand:[],
            check_type:[],
            check_Brand:[],
            getOnlyType:[],
            getOnlyBrand:[],
            carByType:[],
            order_amountDay:"",
            order:[],
            
           
           
        }
    },
    mounted(){
        this.getAllCars()
        this.selectType()
         this.getAllLocations()
         this.getAllBack()
        
    },
    methods: {
        getAllCars(){
            axios.get("/order/getAllCars")
            .then((res) => {
                this.cars = res.data
                this.check_type = res.data.map((val)=>{return val.type}).sort()
                this.car_type = this.check_type.map((val,index)=>{
                    if(val==this.check_type[index+1]&&index!==this.check_type.length-1){
                        return {"count":1,"type":val,"check":false}
                    }
                    else if(index==this.check_type.length-1 && val ==this.check_type[index-1]){
                        return {"count":1,"type":val,"check":false},{"count":0,"type":"All","check":false}
                    }
                    else if(index==this.check_type.length-1){
                        return {"count":0,"type":val,"check":false},{"count":0,"type":"All","check":false}

                    }
                    return {"count":0,"type":val,"check":false}
                    } )
                this.getOnlyType = this.car_type.filter((val)=> val.count==0)

                this.check_Brand = res.data.map((val)=>{return val.brand}).sort()
                this.car_Brand = this.check_Brand.map((val,index)=>{
                    if(val==this.check_Brand[index+1]&&index!==this.check_Brand.length-1){
                        return {"count":1,"brand":val,"check":false}
                    }
                    else if(index==this.check_Brand.length-1 && val ==this.check_Brand[index-1]){
                        return {"count":1,"brand":val,"check":false}
                    }
                    return {"count":0,"brand":val,"check":false}
                    } )
                this.getOnlyBrand = this.car_Brand.filter((val)=> val.count==0)
                    
               
            })
            .catch((err) => {
                console.log(err)
            })
        },
        getAllLocations(){
            axios.get("/order/getAllLocations")
            .then((res) => {
                this.locations = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
         getAllBack(){
            // axios.get("/"+`${this.route.params.car_id}`+"/"+`${this.route.params.type}`+"/"+`${this.route.params.timeStart}`+"/+"+`${this.route.params.timeEnd}`+"/"+`${this.route.params.dateStart}`+"/"+`${this.route.params.dateEnd}`+"/"+`${this.route.params.location}`)
             axios.get("/"+`${this.route.params.car_id}`+`${this.route.params.type}`+`${this.route.params.timeStart}`+`${this.route.params.timeEnd}`+`${this.route.params.dateStart}`+`${this.route.params.dateEnd}`+`${this.route.params.location}`)
            .then((res) => {
                this.order_carId = this.route.params.car_id
                this.timeStart= this.route.params.timeStart
                this.timeEnd  = this.route.params.timeEnd
                this.getOnlyType =this.route.params.location
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },

       
        selectModel(id,model){ 
            this.check_model = true;
            this.order_carModel = model;
            this.order_carId = id;
            this.old_Model = model;
        },
         selectType(type){
            if(type ===""||type=="All"){
                this.carByType = this.cars
               
            }
            else{
                this.carByType=this.cars.filter((val)=>val.type==this.order_carType);
                this.order_carId = ""
            }
            
        },
        // change(id){
        //     this.order_carId==id
        // },
        Confirm(){
            if(this.order_carId ==""){
                alert('กรุณาเลือกรถ');
            }
            else if(this.order_timeStart == ""|| this.order_timerEnd=="" || this.order_dateStert==""||this.order_dateEnd==""){
                alert('กรุณากรอกวัน-เวลาให้ครบ');
            }
            else if(this.order_detail==""){
                alert('กรุณาเลือกสถานที่ในการนัดรับรถ');
            }
            else {
                let month_start= parseInt(this.order_dateStert.slice(5,7))
                let month_end= parseInt(this.order_dateEnd.slice(5,7))
                let day_start= parseInt(this.order_dateStert.slice(8,11))
                let day_end= parseInt(this.order_dateEnd.slice(8,11))
           
                let month = parseInt(month_end-month_start)
                if(month_end<month_start){
                    month = (12-month_start) +month_end
                }
                console.log(day_start+"----m-s")
                console.log( day_end+"----m-e")
                if(month_end==month_start){
                    this.order_amountDay = day_end-day_start;
                    console.log(this.order_amountDay)

                }
                else{
                    this.order_amountDay = day_end+((30*month)-day_start)
                    console.log(this.order_amountDay)
                }
                
                this.$router.push({name: 'showDetail',
                params:{car_id:this.order_carId,amountDay:this.order_amountDay,location:this.order_detail,dateStart:this.order_dateStert,dateEnd:this.order_dateEnd,timeStart:this.order_timeStart,timeEnd:this.order_timerEnd}
                 })
               
            }
           
            
            
            
           
        },

    },
}
</script>

<style scoped>
</style>
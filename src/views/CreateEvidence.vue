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
  </nav> 
    <div class="colummns">
        <div class="column is-three-fifths is-offset-one-fifth">
            <center><h4 class="title is-4 mt-5">แบบฟอร์มส่งหลักฐานการชำระเงิน</h4></center>
            <div class="box mt-5">
                <div class="field">
                    <label class="label">หมายเลขการจอง</label>
                    <div class="control">
                    <input class="input" type="text" placeholder="" v-model="orderId">
                    </div>
                </div>

                <div class="field">
                    <label class="label">ชื่อ-นามสกุล</label>
                    <div class="control">
                    <input class="input" type="text" placeholder="" v-model="cusName">
                    </div>
                </div>

                <div class="field">
                    <label class="label">อีเมลติดต่อ</label>
                    <div class="control">
                    <input class="input" type="email" placeholder="" v-model="email">
                    </div>
                </div>

                <div class="field">
                    <label class="label">วัน-เวลาที่ชำระเงิน</label>
                    <div class="control">
                        <!-- <div class="input"> -->
                            <date-time v-model="datetime" type="datetime"></date-time>
                        <!-- </div> -->
                        
                    </div>
                </div>


                <div class="field">
                    <label class="label">จำนวนเงิน</label>
                    <div class="control">
                    <input class="input" type="number" placeholder="" v-model="totalPrice">
                    </div>
                </div>

                <button class="button is-primary" @click="addPayment()">Submit</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'
import axios from '@/plugins/axios'

export default {
    data(){
        return{
            orderId: '',
            cusName: '',
            email: '',
            datetime: '',
            totalPrice: '',
            datetimeFormat: ''
        }
        
    },
    computed: {
        timestamp: function(){
            // this.datetimeFormat = moment(this.datetime).format('DD/MM/YYYY, HH:mm')
            return moment(this.datetime).format('DD/MM/YYYY, HH:mm')
        }
    },
    methods: {
        addPayment(){
            if (this.orderId === ''){
                alert('กรุณาใส่หมายเลขการจอง')
            }
            else if (this.cusName === ''){
                alert('กรุณาใส่ชื่อ-นามสกุลของคุณ')
            }
            else if (this.email === ''){
                alert('กรุณาใส่อีเมลติดต่อ')
            }
            else if (this.datetime === ''){
                alert('กรุณาเลือกวัน-เวลาที่ชำระเงิน')
            }
            else if (this.totalPrice === ''){
                alert('กรุณาใส่จำนวนเงินที่ชำระ')
            }
            else {
                const formData = new FormData();
                formData.append("cusName", this.cusName)
                formData.append("email", this.email)
                formData.append("datetime", this.timestamp)
                formData.append("totalPrice", this.totalPrice)
                console.log(this.timestamp)
                axios
                    .post("/payments/addPayment/"+this.orderId, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                    .then((res) => {
                        console.log(res)
                        console.log('create evidence complete')
                        this.$router.push({name: 'selectCar'})
                    })
                    .catch((error) => {
                        alert(error.response.data.message)
                    });
            }
        },
    }
}
</script>

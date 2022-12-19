<template>
    <div class="colummns">
        <div class="column is-three-fifths is-offset-one-fifth">
            <center><h4 class="title is-4 mt-5">แบบฟอร์มส่งหลักฐานการชำระเงิน</h4></center>
            <form class="box mt-5">
                <div class="field">
                    <label class="label">Order Id</label>
                    <div class="control">
                    <input class="input" type="text" placeholder="หมายเลขการจอง">
                    </div>
                </div>
                <datetime v-model="date" type="datetime"></datetime>

                <!-- <div class="field">
                    <label class="label"></label>
                    <div class="control">
                        <datepicker :config="{ wrap: true }" readonly>
                            <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
                            <a class="button" data-clear><i class="fa fa-close"></i></a>
                        </datepicker>
                    </div>
                </div> -->
                <!-- <datepicker :config="{ wrap: true }" readonly>
                            <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
                            <a class="button" data-clear><i class="fa fa-close"></i></a>
                </datepicker> -->
                <div class="field">
                    <label class="label">Amount</label>
                    <div class="control">
                    <input class="input" type="number" placeholder="จำนวนเงิน">
                    </div>
                </div>

                <button class="button is-primary">Sign in</button>
            </form>
        </div>
    </div>

</template>

<script>
// import Datepicker from 'vue-bulma-datepicker'

export default {
//   components: {
//     Datepicker
//   }
    data(){
        return{
            date: '',
        }
        
    }
}
</script>
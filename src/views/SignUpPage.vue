<template>
    <section class="hero  is-fullheight">
      <div class="hero-body">
        <div class="container" >
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <!-- <form action="" class="box"> -->
               <h1 style="margin-bottom: 5%;font-size: 30px;font-weight:50px;">SingUp</h1>
                <div class="field">
                  <label for="" class="label">Email</label>
                  
                  <div class="control has-icons-left"> 
                    <input type="email"  v-model="email" class="input"  placeholder="Email" required>
                    <span class="icon is-small is-left">
                      <font-awesome-icon icon="fa-solid fa-user" />
                    </span>
      
                  </div>
                </div>
               
                <div class="field">
                  <label for="" class="label">Password</label>
                  <div class="control has-icons-left">
                    <input type="password" placeholder="*******" class="input" v-model="password" required>
                    <span class="icon is-small is-left">
                      <font-awesome-icon icon="fa-solid fa-lock" />
                    </span>
                    
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Confirm Password</label>
                  <div class="control has-icons-left">
                    <input type="password" placeholder="*******" class="input" v-model="confirmpassword" required>
                    <span class="icon is-small is-left">
                      <font-awesome-icon icon="fa-solid fa-lock" />
                    </span>
                    
                  </div>
                </div>

                <div class="field">
                  <button class="button is-success" style="margin-bottom: 5px;margin-left: 75px;" @click="submit()">
                    Sing Up
                  </button>
                </div>
                
              <!-- </form> -->
            </div>
          </div> 
        </div>
      </div>
    </section>
    </template>
    <script>
    import axios from '@/plugins/axios'
    export default {
      data () {
        return {
          email: '',
          password: '',
          confirmpassword: '',
          error: ''
        }
      },
      methods: {
        async submit(){
            // e.preventDefault()

            // if(this.email == '' || this.password ==''){
            //   this.$toast.error('กรุณาใส่ข้อมูล')
            //   return false;
            // }

           const data = {
            email : this.email,
            password : this.password,

           }

           
           if( this.password == this.confirmpassword){
           axios
           .post('/auth/register', data)
           .then((res) => {
            if(res.data == false){
              alert('email นี้ถูกใช้ไปแล้ว')
            }else{
              alert("ลงทะเบียนสำเร็จ")
              this.$router.push("/admin/logIn")
            }
            console.log(res.data)
           })
          // console.log(e)
           }
           else{
              alert('กรุณากรอกข้อมูลใหม่')
           }
        }
     
       },
    }
    </script>

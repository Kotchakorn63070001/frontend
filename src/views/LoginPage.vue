<template>
    <section class="hero  is-fullheight">
      <div class="hero-body">
        <div class="container" >
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <!-- <form action="" class="box"> -->
               <h1 style="margin-bottom: 5%;font-size: 30px;font-weight:50px;">Login</h1>
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
                  <button class="button is-success" style="margin-bottom: 5px;margin-left: 75px;" @click="submit()">
                    Login
                  </button>
                </div>
<!--                 
              </form> -->
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
          error: ''
        }
      },
      methods: {
        submit() {
          const data = {
            email: this.email,
            password: this.password
            
          }
          axios 

            .post('/auth/login', data)
            .then((res) => {
              
              console.log(res)
             
              
              if(res.status === 200){
                localStorage.setItem("Token", res.data.accessToken)
                console.log('check')
                console.log("check home")
              
              this.$router.replace({ name: "ourcar"}).catch(()=>{});
              
            } else {
              alert("กรุณาตรวจสอบข้อมูลใหม่");
            }     
            })
            .catch(() => alert("catch") )
          }
          

         
       },
    }
    </script>

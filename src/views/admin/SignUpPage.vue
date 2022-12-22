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

      <!-- <a class="navbar-item">
        <router-link to="/payments/addPayment" class="has-text-white">
          <span>Inform Evidence</span>
        </router-link>
      </a> -->

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
    <section class="hero  is-fullheight">
      <div class="hero-body">
        <div class="container" >
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <!-- <form action="" class="box"> -->
               <h1 style="margin-bottom: 5%;font-size: 30px;font-weight:50px;">SignUp</h1>
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
                    Sign Up
                  </button>
                </div>
                
              <!-- </form> -->
            </div>
          </div> 
        </div>
      </div>
    </section>
</div>
    </template>
    
    <script>
    import axios from '@/plugins/axios'
    export default {
      data () {
        return {
          email: '',
          password: '',
          confirmpassword: '',
          error: '',
          user: true,
        }
      },
      methods: {
        async submit(){
            

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
        
        return true
        }
        return false;
      },
     
       },
    }
    </script>
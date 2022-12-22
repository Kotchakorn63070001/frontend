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
  
    <div class="box">
        <div class="content">
            <center>
                <h3>Our Car
                    <button class="button is-small is-link is-rounded" aria-haspopup="true" aria-controls="dropdown-menu3" style="padding-left: 1em; padding-right: 1em;" @click="modalAddCar = !modalAddCar">
                        <span class="icon is-medium">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </span>
                    </button>
                </h3>
            </center>

            <table class="table is-hoverable">
                <thead class="has-background-primary">
                    <tr>
                        <th>CarId</th>
                        <th>ประเภท (Type)</th>
                        <th>ยี่ห้อ (Brand)</th>
                        <th>รุ่น (Model)</th>
                        <th>จำนวนที่นั่ง (NumOfSeat)</th>
                        <th>ราคาเช่าต่อวัน (Price)</th>
                        <th>จำนวนรถ (Quantity)</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="has-background-primary-light">
                    <tr v-for="car in cars" v-bind:key="car._id">
                        <td>{{car._id}}</td>
                        <td>{{car.type}}</td>
                        <td>{{car.brand}}</td>
                        <td>{{car.model}}</td>
                        <td>{{car.numOfSeat}}</td>
                        <td>฿ {{car.price}}</td>
                        <td>{{car.quantity}}</td>
                        <td>
                            <figure class="image is-256x256">
                                <img v-bind:src="`data:image/png;base64, ${car.image.data}`">
                            </figure>
                        </td>
                        <td>
                            <button class="button is-small is-warning is-rounded" aria-haspopup="true" aria-controls="dropdown-menu3" style="padding-left: 1em; padding-right: 1em;" @click="updateCarConfirm(car)">
                                <span class="icon is-medium">
                                    <font-awesome-icon icon="fa-solid fa-marker" />
                                </span>
                            </button>
                            <button class="button is-small is-danger is-rounded" aria-haspopup="true" aria-controls="dropdown-menu3" style="padding-left: 1em; padding-right: 1em;" @click="delCarConfirm(car.model)">
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
        <div class="modal" v-bind:class="{'is-active' : modalDeleteCar}">
            <div class="modal-background" @click="modalDeleteCar = !modalDeleteCar"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Delete Car</p>
                    <button class="delete" aria-label="close" @click="modalDeleteCar = !modalDeleteCar"></button>
                </header>
                <section class="modal-card-body">
                    <div class="column">
                        <p>Are you sure you want to delete car model : {{modelDel}}</p>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-danger" @click="delCar(modelDel)">Delete</button>
                    <button class="button" @click="modalDeleteCar = !modalDeleteCar">Cancel</button>
                </footer>
            </div>
        </div>
        <!-- Modal Add New Car Form -->
        <div class="modal" v-bind:class="{'is-active' : modalAddCar}">
            <div class="modal-background" @click="modalAddCar = !modalAddCar"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add New Car</p>
                    <button class="delete" aria-label="close" @click="modalAddCar = !modalAddCar"></button>
                </header>
                <section class="modal-card-body">
                    <div class="column">
                        <div class="field">
                            <label class="label">Type</label>
                            <div class="select">
                                <select v-model="typeCar">
                                    <option value="" disabled="disabled">--- Select Type of Car ---</option>
                                    <option value="sedan">sedan</option>
                                    <option value="suv">suv</option>
                                    <option value="pickup">pickup</option>
                                    <option value="van">van</option>
                                </select>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Brand</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="" v-model="brandCar">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Model</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="" v-model="modelCar">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">NumOfSeat</label>
                            <div class="control">
                                <input class="input" type="number" placeholder="" v-model="numOfSeatCar">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Price</label>
                            <div class="control has-icons-left">
                                <input class="input" type="number" placeholder="" v-model="priceCar">
                                <span class="icon is-small is-left">
                                    <font-awesome-icon icon="fa-solid fa-baht-sign" />
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Quantity</label>
                            <div class="control">
                                <input class="input" type="number" placeholder="" v-model="quantityCar">
                            </div>
                        </div>
                        <div class="file">
                            <label class="file-label">
                            <input class="file-input" type="file" accept="image/png, image/jpeg, image/jpg, image/webp" @change="selectImage($event)">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <font-awesome-icon icon="fa-solid fa-upload" />
                                    </span>
                                    <span class="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                            </label>
                        </div>
                        <!-- Show Image -->
                        <div v-if="imageCar" class="columns">
                            <div class="column">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img :src="showImage(imageCar)" alt="Placeholder image">
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-link" @click="addCar()">Add New Car</button>
                    <button class="button" @click="modalAddCar = !modalAddCar">Cancel</button>
                </footer>
            </div>
        </div>

        <!-- Modal Update Car Form -->
        <div class="modal" v-bind:class="{'is-active' : modalUpdateCar}">
            <div class="modal-background" @click="modalUpdateCar = !modalUpdateCar; checkUpdateNewImage = false"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Update Car</p>
                    <button class="delete" aria-label="close" @click="modalUpdateCar = !modalUpdateCar; checkUpdateNewImage = false"></button>
                </header>
                <section class="modal-card-body">
                    <div class="column">
                        <div class="field">
                            <label class="label">Type</label>
                            <div class="select">
                                <select v-model="updateTypeCar">
                                    <option value="" disabled="disabled">--- Select Type of Car ---</option>
                                    <option value="sedan">sedan</option>
                                    <option value="suv">suv</option>
                                    <option value="pickup">pickup</option>
                                    <option value="van">van</option>
                                </select>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Brand</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="" v-model="updateBrandCar">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Model</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="" v-model="updateModelCar">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">NumOfSeat</label>
                            <div class="control">
                                <input class="input" type="number" placeholder="" v-model="updateNumOfSeatCar">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Price</label>
                            <div class="control has-icons-left">
                                <input class="input" type="number" placeholder="" v-model="updatePriceCar">
                                <span class="icon is-small is-left">
                                    <font-awesome-icon icon="fa-solid fa-baht-sign" />
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Quantity</label>
                            <div class="control">
                                <input class="input" type="number" placeholder="" v-model="updateQuantityCar">
                            </div>
                        </div>
                        <div class="file">
                            <label class="file-label">
                            <input class="file-input" type="file" accept="image/png, image/jpeg, image/jpg, image/webp" @change="selectUpdateImage($event)">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <font-awesome-icon icon="fa-solid fa-upload" />
                                    </span>
                                    <span class="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                            </label>
                        </div>
                        <!-- Show Image -->
                        <div v-if="updateImageCar" class="columns">
                            <div class="column">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img v-bind:src="`data:image/png;base64, ${updateImageCar.data}`" alt="Placeholder image">
                                            <img v-if="checkUpdateNewImage" :src="showImage(updateImageCar)" alt="Placeholder image">
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-link" @click="updateCar()">Update Car</button>
                    <button class="button" @click="modalUpdateCar = !modalUpdateCar; checkUpdateNewImage = false">Cancel</button>
                </footer>
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
            cars: [],
            modalDeleteCar: false,
            modelDel: '',
            modalAddCar: false,
            typeCar: '',
            brandCar: '',
            modelCar: '',
            numOfSeatCar: '',
            priceCar: '',
            quantityCar: '',
            imageCar: '',
            modalUpdateCar: false,
            updateCarId: '',
            updateTypeCar: '',
            updateBrandCar: '',
            updateModelCar: '',
            updateNumOfSeatCar: '',
            updatePriceCar: '',
            updateQuantityCar: '',
            updateImageCar: '',
            checkUpdateNewImage: false,
            user: true,
        }
    },
    mounted(){
        this.getAllCars()
         this.isLogin()
    },
    methods: {
        getAllCars(){
            axios.get("/cars/getAllCars")
            .then((res) => {
                this.cars = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        delCarConfirm(carModel){
            this.modalDeleteCar = true
            console.log(carModel)
            this.modelDel = carModel
        },
        delCar(carModel){
            console.log(carModel)
            axios.delete("/cars/delCar/"+carModel)
            .then((res) => {
                console.log(res)
                this.modalDeleteCar = false
                document.location.reload(true);
            })
            .catch((err) => {
                console.log(err)
                this.modalDeleteCar = false
            })
        },
        updateCarConfirm(car){
            this.modalUpdateCar = true
            this.updateCarId = car._id
            this.updateTypeCar = car.type
            this.updateBrandCar = car.brand
            this.updateModelCar = car.model
            this.updateNumOfSeatCar = car.numOfSeat
            this.updatePriceCar = car.price
            this.updateQuantityCar = car.quantity
            this.updateImageCar = car.image
        },
        selectUpdateImage(event){
            this.checkUpdateNewImage = true
            this.updateImageCar = event.target.files[0]
        },
        selectImage(event){
            this.imageCar = event.target.files[0]
        },
        showImage(image){
            return URL.createObjectURL(image)
        },
        addCar(){
            if (this.typeCar === 0){
                alert('กรุณาเลือกประเภทรถ')
            }
            else if (this.brandCar === ''){
                alert('กรุณาใส่ยี่ห้อรถ')
            }
            else if (this.modelCar === ''){
                alert('กรุณาใส่รุ่นรถ')
            }
            else if (this.numOfSeatCar === ''){
                alert('กรุณาใส่จำนวนที่นั่ง')
            }
            else if (this.priceCar === ''){
                alert('กรุณาใส่ราคาเช่าต่อวัน')
            }
            else if (this.quantityCar === ''){
                alert('กรุณาใส่จำนวนรถ')
            }
            else if (this.imageCar === ''){
                alert('กรุณาเพิ่มรูปภาพรถ')
            }
            else{
                const formData = new FormData();
                formData.append("type", this.typeCar)
                formData.append("brand", this.brandCar)
                formData.append("model", this.modelCar)
                formData.append("numOfSeat", this.numOfSeatCar)
                formData.append("price", this.priceCar)
                formData.append("quantity", this.quantityCar)
                formData.append("image", this.imageCar)
                axios
                    .post("/cars/addCar", formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                    .then(() => {
                        this.$router.push({name: 'ourcar'})
                        this.modalAddCar = false
                        document.location.reload(true);
                    })
                    .catch((error) => {
                        alert(error.response.data.message)
                        this.modalAddCar = false
                    });
            }
        },
        updateCar(){
            if (this.updateTypeCar === 0){
                alert('กรุณาเลือกประเภทรถ')
            }
            else if (this.updateBrandCar === ''){
                alert('กรุณาใส่ยี่ห้อรถ')
            }
            else if (this.updateModelCar === ''){
                alert('กรุณาใส่รุ่นรถ')
            }
            else if (this.updateNumOfSeatCar === ''){
                alert('กรุณาใส่จำนวนที่นั่ง')
            }
            else if (this.updatePriceCar === ''){
                alert('กรุณาใส่ราคาเช่าต่อวัน')
            }
            else if (this.updateQuantityCar === ''){
                alert('กรุณาใส่จำนวนรถ')
            }
            else if (this.updateImageCar === ''){
                alert('กรุณาเพิ่มรูปภาพรถ')
            }
            else{
                const formData = new FormData();
                formData.append("type", this.updateTypeCar)
                formData.append("brand", this.updateBrandCar)
                formData.append("model", this.updateModelCar)
                formData.append("numOfSeat", this.updateNumOfSeatCar)
                formData.append("price", this.updatePriceCar)
                formData.append("quantity", this.updateQuantityCar)
                formData.append("image", this.updateImageCar)
                axios
                    .put("/cars/updateCar/"+this.updateCarId, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                    .then(() => {
                        this.$router.push({name: 'ourcar'})
                        this.modalUpdateCar = false
                        this.checkUpdateNewImage = false
                        document.location.reload(true);
                    })
                    .catch((error) => {
                        alert(error.response.data.message)
                        this.modalUpdateCar = false
                        this.checkUpdateNewImage = false
                    });
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
    }
}
</script>

<style scoped>

</style>

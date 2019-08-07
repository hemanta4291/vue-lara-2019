
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-6">
                                Profile again chagee Component
                            </div>
                            <div class="col-md-6 text-right">
                                <button class="btn btn-success" @click="modalcoustom()">create<i class="fas fa-users"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- modal -->
                    <form @submit.prevent="usermode? update():newUser()">
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 v-show="usermode" class="modal-title" id="exampleModalLabel">Update Information</h5>
                                <h5 v-show="!usermode" class="modal-title" id="exampleModalLabel">Create User</h5>
                                <button type="button" @click="closeRemoveline()" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <input v-model="form.name" type="text" name="name"
                                        placeholder="Enter Name"
                                        class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                    <has-error :form="form" field="name"></has-error>
                                </div>
                                <!-- email -->
                                <div class="form-group">
                                    <input v-model="form.email" type="text" name="email"
                                        placeholder="Enter Email"
                                        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                    <has-error :form="form" field="email"></has-error>
                                </div>
                                <!-- password -->
                                <div class="form-group">
                                    <input v-model="form.password" type="password" name="password"
                                        placeholder="Enter password"
                                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                    <has-error :form="form" field="password"></has-error>
                                </div>
                                <!-- bio -->
                                <div class="form-group">
                                    <textarea v-model="form.bio" type="text" name="bio"
                                        placeholder="Enter bio"
                                        class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                    <has-error :form="form" field="bio"></has-error>
                                </div>
                                <!-- type -->
                                <div class="form-group">
                                    <select name="type" v-model="form.type"
                                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                        <option>=======select type========</option>
                                        <option value="admin">admin</option>
                                        <option value="user">user</option>
                                        <option value="author">author</option>
                                        </select>
                                    <has-error :form="form" field="email"></has-error>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" @click="closeRemoveline()" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button v-show="usermode" type="submit" class="btn btn-success">Update</button>
                                 <button v-show="!usermode" type="submit" class="btn btn-primary">Create</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        </form>
                    <!-- modal end -->

                    <div class="card-body">
                       <div class="card-body table-responsive p-0">
                                    <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Type</th>
                                        <th>Registrate at</th>
                                        <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in users" :key="user.id">
                                        <td>{{user.id}}</td>
                                        <td>{{user.name}}</td>
                                        <td>{{user.email}}</td>
                                        <td>{{user.type | upText}}</td>
                                        <td>{{user.created_at | dateFor}}</td>
                                        <td><button @click="modalEdit(user)"><i class="fas fa-edit"></i></button>
                                        <button @click="deleitem(user.id)"><i class="fas fa-trash-alt"></i></button>
                                        </td>
                                        </tr> 
                                    </tbody>
                                    </table>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                usermode: false,
                users:{},
                form: new Form({
                    id:'',
                    name:'',
                    email:'',
                    password:'',
                    type:'',
                    bio:'',
                    photo:''
                })
            }
        },
        methods:{
            modalcoustom(){
                this.usermode = false;
                this.form.reset();
                $("#exampleModal").modal("show")
            },
            //edit 
             modalEdit(user){
                 this.usermode = true;
                this.form.reset();
                $("#exampleModal").modal("show")
                this.form.fill (user)
                console.log(this.from)
            },
            //update
            update(){
                this.$Progress.start();
                this.form.put('api/user/'+this.form.id)
                .then(()=>{
                   
                    $("#exampleModal").modal("hide")
                    Fire.$emit('reloaded');
                    Swal.fire(
                            'Updated!',
                            'Informations has been Updated.',
                            'success' )
                    this.$Progress.finish();
                })
                .catch(()=>{
                    this.$Progress.fail();
                })
            },
            newUser(){
                this.form.post('api/user')
                .then(()=>{
                    this.$Progress.start()
                    $("#exampleModal").modal("hide")
                    Fire.$emit('reloaded');
                    Toast.fire({
                            type: 'success',
                            title: 'Signed in successfully'
                        })
                    this.$Progress.finish()
                })
                .catch()
                
                // this.form={}
            },
            closeRemoveline(){
                Fire.$emit('reloaded');
            },
            loadData(){
                axios.get('api/user')
                .then(res=>{
                    this.users = res.data.data;
                    console.log(res);
                    
                })
            },
            deleitem(id){
                
                Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {

                    if(result.value){
                        this.form.delete('api/user/'+id)
                        .then(()=>{
                            Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success' )
                            Fire.$emit('reloaded');

                        }).catch(()=>{
                            swal("Failed","There Was Something Wrang.","warning");
                        })
                    }

                })


            }
        },
        created(){
            this.loadData();
            Fire.$on('reloaded',()=>{
                this.loadData();
            })

            
        }
    }
</script>







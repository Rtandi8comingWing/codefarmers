<template>
    <div class="register-content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>Register</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toLogin">Already have an account? Go back to the login page</el-button>
            </div>
            <el-form :rules="rules" :model="formData" ref="formData" label-width="150px" class="demo-ruleForm">
                <el-form-item label="Username" prop="username">
                    <el-input v-model.trim="formData.username" type="text" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model.trim="formData.password" @blur="checkPassword" type="password"
                        auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Confirm Password" prop="confirmPassword">
                    <el-input v-model.trim="formData.confirmPassword" @blur="checkPassword" type="password"
                        auto-complete="off"></el-input>
                    <div class="el-form-item__error" ref="confirmPassword"></div>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model.trim="formData.email" type="text" required=true auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register('formData')">Register</el-button>
                    <el-button @click="reset">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
  
<script>
import { registerAPI } from '../../api/index.js'
export default {
    name: 'Register',
    data: () => {
        return {
            // Form data
            formData: {
                username: '',
                password: '',
                confirmPassword: '',
                email: ''
            },
            // Form validation rules
            rules: {
                username: [
                    { required: true, message: 'Please enter a username', trigger: 'blur' },
                    { min: 3, max: 20, message: 'Length should be between 3 and 20 characters', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please enter a password', trigger: 'blur' },
                    { min: 8, max: 20, message: 'Length should be between 6 and 20 characters', trigger: 'blur' },
                    { pattern: /^(?=.*[a-zA-Z])(?=.*\d|\W).*$/, message: 'Password must contain at least two of the following: letters, numbers, special characters', trigger: 'blur' }
                ],
                confirmPassword: { required: true, message: 'Please enter the password again', trigger: 'blur' },
                email: [
                    { required: true, message: 'Please enter an email', trigger: 'blur' },
                    { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods: {

        checkPassword() {
            if (this.formData.password === '') return false
            else if (this.formData.password !== '' && this.formData.confirmPassword == '') {
                this.$refs.confirmPassword.innerHTML = ''
                return false
            } else if (this.formData.confirmPassword !== this.formData.password) {
                this.$refs.confirmPassword.innerHTML = 'The passwords entered do not match'
                return false
            }
            this.$refs.confirmPassword.innerHTML = ''
            return true
        },
        // Register function
        register(formData) {
            this.$refs[formData].validate(async valid => {
                if (valid) {
                    if (!this.checkPassword()) return this.$message('Please fill in the correct information')
                    // Parse the data from the response and rename it as 'res'
                    registerAPI(this.formData).then(res => {
                        if (res.id !== undefined) {
                            this.$message({
                                message: 'Registration successful',
                                type: 'success'
                            })
                            this.$router.push('/login')
                        }
                    }).catch(err => {
                        this.$message({
                            message: 'Registration failed, username or email already exists',
                            type: 'error'
                        })
                    })
                } else {
                    this.reset()
                    this.$message('Please fill in the correct information')
                }
            })
        },
        // Reset function
        reset() {
            this.formData.username = ''
            this.formData.password = ''
            this.formData.confirmPassword = ''
            this.formData.email = ''
        },
        // Go back to the login page
        toLogin() {
            this.$router.push('/login')
        }
    }
}
</script>
  
<style>
.register-content{
    background-image: url(../../assets/img/background2.png);
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
}

.box-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
}

.el-col {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
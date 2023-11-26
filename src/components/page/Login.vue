<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">Code Farmers TodoList</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">Login</el-button>
                </div>
                <div class="register-link-container">
                    <router-link to="/register">
                        <el-button type="text" class="register-btn">No account? Register!</el-button>
                    </router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import  {loginInfo} from '../../api/index.js'
import router from '../../router';
export default {
    data: function () {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: 'Please enter your username', trigger: 'blur' }],
                password: [{ required: true, message: 'Please enter your password', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
					// loginInfo(this.param).then(res => {
					//     console.log(res);
					// });
					//调用登陆的接口
					loginInfo(this.param).then(res => {
                        this.$message({
                            message: 'Login sussessfully',
                            type: 'success',
                        });
                        localStorage.setItem('ms_username', this.param.username);
                        this.$router.push('/');
					}).catch(err => {
                        this.$message({
                            message: 'Login failed, please check your username and password',
                            type: 'error',
                        });
                    });
                }
                else {
                    this.$message.error('Please check your username and password');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    components: { router }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.png);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(65, 62, 62, 0.6);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.register-btn {
    margin-top: 10px;
    font-size: 15px;
    color: crimson; /* 设置字体颜色 */
    font-weight: bold; /* 加粗字体 */
    /* 添加更多样式来调整按钮的外观 */
}
.register-link-container {
    text-align: right; /* 设置文本右对齐 */
    margin-top: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
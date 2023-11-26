<template>
    <div class="register-content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>注册</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toLogin">我有账号，去登录</el-button>
            </div>
            <el-form :rules="rules" :model="formData" ref="formData" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model.trim="formData.username" type="text" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model.trim="formData.password" @blur="checkPassword" type="password"
                        auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model.trim="formData.confirmPassword" @blur="checkPassword" type="password"
                        auto-complete="off"></el-input>
                    <div class="el-form-item__error" ref="confirmPassword"></div>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model.trim="formData.email" type="text" required=true auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register('formData')">注册</el-button>
                    <el-button @click="reset">重置</el-button>
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
            // 表单数据
            formData: {
                username: '',
                password: '',
                confirmPassword: '',
                email: ''
            },
            // 表单验证规则
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 8, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
                    { pattern: /^(?=.*[a-zA-Z])(?=.*\d|\W).*$/, message: '密码必须包含数字和字母、特殊符号中的两种', trigger: 'blur' }
                ],
                confirmPassword: { required: true, message: '请再次输入密码', trigger: 'blur' },
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
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
                this.$refs.confirmPassword.innerHTML = '两次输入的密码不一致'
                return false
            }
            this.$refs.confirmPassword.innerHTML = ''
            return true
        },
        // 注册函数
        register(formData) {
            this.$refs[formData].validate(async valid => {
                if (valid) {
                    if (!this.checkPassword()) return this.$message('请填写正确信息')
                    // 从返回的数据中解析data数据，并且重命名为res
                    registerAPI(this.formData).then(res => {
                        if (res.id !== undefined) {
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            })
                            this.$router.push('/login')
                        }
                    }).catch(err => {
                        this.$message({
                            message: '注册失败，用户名或邮箱已存在',
                            type: 'error'
                        })
                    })
                } else {
                    this.reset()
                    this.$message('请填写正确信息')
                }
            })
        },
        // 重置函数
        reset() {
            this.formData.username = ''
            this.formData.password = ''
            this.formData.confirmPassword = ''
            this.formData.email = ''
        },
        // 跳转到登录页面
        toLogin() {
            this.$router.push('/login')
        }
    }
}
</script>
  
<style>
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

.codeImg {
    margin: 0 15px;
    border-radius: 10px;
}

.changeCodeImg {
    width: 100px;
    color: #409eff;
    text-decoration: none;
    cursor: pointer;
}</style>
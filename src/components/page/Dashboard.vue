<template>
    <div>
        <el-card>
            <p class="welcome">Codefarmers welcome you to use our TodoList!</p>
            <br /><br />
            <p class="introduction">1.You can add tasks and due dates in this website.</p>
            <br />
            <p class="introduction">2.Any tasks can be edited and deleted.</p>
            <br />
            <p class="introduction">3.you can add important tasks from your tasksList directly,it's very convenient！</p>
            <br />
            <p class="introduction">4.we will send you an email when the task is due!</p>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'admin',
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    }
};
</script>

<style>
.welcome {
    font-size: 40px;
    font-weight: bold;
}

.introduction {
    font-size: 30px;
    font-weight: bold;
}
</style>
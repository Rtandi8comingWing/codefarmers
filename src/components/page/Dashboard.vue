<template>
    <div>
        <v-card class="mx-12 my-12 pa-6">
            <!-- <p class="welcome"></p> -->
            <v-card-title>
                <h1>Codefarmers welcome you to use our TodoList!</h1>
            </v-card-title>

            <v-checkbox v-model="checkbox" :label="`1. You can add tasks and due dates in this website.`"></v-checkbox>
            <v-checkbox v-model="checkbox" :label="`2. Any tasks can be edited and deleted.`"></v-checkbox>
            <v-checkbox v-model="checkbox"
                :label="`3. You can add important tasks from your task list directly,it's very convenient!`"></v-checkbox>
            <v-checkbox v-model="checkbox" :label="`4. We will send you an email when the task is due!`"></v-checkbox>


            <span style="display: block; text-align: right;margin-bottom:25px;">——These are our codefarmers!</span>
            <el-carousel :interval="3000" type="card" arrow="always">
                <el-carousel-item v-for="(item, index) in images" :key="index">
                    <img :src="item.url" alt="Slide" style="width: 100%; height: 300px;object-fit:contain;" />
                    <p class="image-caption">{{ item.caption }}</p>
                </el-carousel-item>
            </el-carousel>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkbox: true,
            name: 'admin',
            images: [
                {
                    url: require('../../assets/img/codefarmer.jpg'),
                    caption: 'Max'
                },
                {
                    url: require('../../assets/img/codefarmer1.jpg'),
                    caption: 'Maverick'
                },
                {
                    url: require('../../assets/img/codefarmer2.png'),
                    caption: 'Allen'
                },
                {
                    url: require('../../assets/img/codefarmer3.png'),
                    caption: 'Alchemy'
                },
                {
                    url: require('../../assets/img/codefarmer4.png'),
                    caption: 'Patrick'
                },
                {
                    url: require('../../assets/img/codefarmer5.jpg'),
                    caption: 'Mike'
                }
            ]
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
    margin-bottom: 10px;
}

.introduction {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
}

.image-caption {
    position: absolute;
    bottom: 0px;
    /* 根据需要调整距离底部的位置 */
    left: 300px;
    /* 根据需要调整距离左侧的位置 */
    color: white;
    /* 文字颜色 */
    font-size: 16px;
    /* 字体大小 */
    font-weight: bold;
    /* 字体粗细 */
}
</style>
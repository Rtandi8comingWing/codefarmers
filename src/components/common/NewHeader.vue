<template>
    <v-card>
        <v-toolbar color="blue" dark flat>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Code Farmers TodoList</v-toolbar-title>

            <v-icon color="yellow">mdi-check</v-icon>
            <v-spacer></v-spacer>
            <span class="username mx-5">{{username}}</span>
            <v-avatar class="mr-2" size="42">
                <img src="../../assets/img/avatar.jpg" alt="User Avatar">
            </v-avatar>

            <v-btn icon @click="toggleFullScreen">
                <v-icon>{{ isFullScreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
            </v-btn>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title>Repository</v-list-item-title>
                        <v-list-item-action>
                            <v-btn icon href="https://github.com/Rtandi8comingWing/codefarmers" target="_blank">
                                <v-icon>mdi-link</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="">
                        <v-list-item-title>Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <template v-slot:extension>
                <v-tabs v-model="model" centered slider-color="yellow">
                    <v-tab to="/dashboard">
                        <v-icon>mdi-view-dashboard</v-icon>
                        Dashboard
                    </v-tab>
                    <v-tab to="/tasks">
                        <v-icon>mdi-format-list-checks</v-icon>
                        Tasks
                    </v-tab>
                    <v-tab to="/importantTasks">
                        <v-icon>mdi-star</v-icon>
                        Important Tasks
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <v-tabs-items v-model="model">
            <v-tab-item value="/dashboard">
                <v-card flat>
                    <v-card-text v-text="text"></v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item value="/tasks">
                <v-card flat>
                    <v-card-text v-text="text"></v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item value="/importantTasks">
                <v-card flat>
                    <v-card-text v-text="text"></v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import { logout } from '../../api';
import router from '../../router';
import bus from '../common/bus';
export default {
    components: { router },
    data() {
        return {
            isFullScreen: false
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        toggleFullScreen() {
            this.isFullScreen = !this.isFullScreen;
            if (this.isFullScreen) {
                // 进入全屏模式
                const docElm = document.documentElement;
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
            } else {
                // 退出全屏模式
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        },
        logout() {
            logout().then(() => {
                logout();
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            });
        }
    }
}
</script>

<style scoped>
</style>

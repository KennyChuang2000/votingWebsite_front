const voteRsult = Vue.createApp({
    data() {
        return {
            voteSummary: [],
            error: null,
        };
    },
    mounted() {
        axios.get('http://localhost:8080/votes/summary')
            .then(response => {
                this.voteSummary = response.data;
            })
            .catch(err => {
                this.error = '取得資料失敗: ' + err.message;
            });
    },
});
voteRsult.mount("#voteRsult");

const login = Vue.createApp({
    data() {
        return {
            username: "",
            password: "",
            errorMsg: "",
            successMsg: ""
        }
    },
    methods: {
        handleLogin() {
            axios.post("http://localhost:8080/login", {
                username: this.username,
                password: this.password
            }, {
                withCredentials: true // 要帶上 cookie（session id）
            })
                .then(response => {
                    this.successMsg = "登入成功！";
                    this.errorMsg = "";
                    console.log("登入成功:", response);
                })
                .catch(error => {
                    this.errorMsg = "登入失敗：" + (error.response?.status || error.message);
                    this.successMsg = "";
                    console.error("登入錯誤:", error);
                });
        }
    }
});
login.mount("#login");





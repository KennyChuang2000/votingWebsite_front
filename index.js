const app = Vue.createApp({
    data() {
        return {
            username: "",
            password: "",
            errorMsg: "",
            successMsg: "",
            voteSummary: [],
            error: null,
            isLoggedIn: false
        };
    },
    methods: {
        handleLogin() {
            axios.post("http://localhost:8080/login", {
                username: this.username,
                password: this.password
            }, {
                withCredentials: true
            })
                .then(response => {
                    console.log(response);
                    this.successMsg = "登入成功！";
                    this.errorMsg = "";
                    this.isLoggedIn = true;
                    this.fetchVoteSummary(); // 登入成功後拉資料
                })
                .catch(error => {
                    this.errorMsg = "登入失敗：" + (error.response?.status || error.message);
                    this.successMsg = "";
                    this.isLoggedIn = false;
                });
        },
        fetchVoteSummary() {
            debugger;
            axios.get('http://localhost:8080/votes/summary', {
                withCredentials: true
            })
                .then(response => {
                    console.log("response", response.data);
                    this.voteSummary = response.data;
                })
                .catch(err => {
                    console.log("error");
                    this.error = '取得資料失敗: ' + err.message;
                });
            debugger;
        }
    }
});
app.mount("#app");

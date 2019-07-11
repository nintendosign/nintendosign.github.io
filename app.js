new Vue({
    el: '#app',
    data: {
        count: 0,
        profiles: [],
        offset: 0
    },
    methods: {
        get () {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.vk.com/method/wall.getComments?owner_id=-184333261&post_id=2&v=5.52&access_token=c6b36f9cc6b36f9cc6b36f9c18c6d8f3c3cc6b3c6b36f9c9b95b850f5f9982b388a7c71&extended=1&count=100&offset=${this.offset}`);
                    resolve({ count: data.response.count, users: data.response.profiles });
                } catch (error) {
                    reject(error);
                }
            })
        },
        async parse () {
            const info = await this.get();
            for (const user of info.users) {
                if (user.first_name != 'Администрация ВКонтакте') {
                    this.profiles.push({ first_name: user.first_name, last_name: user.last_name, photo: user.photo_100 });
                }
            }
            this.offset += info.users.length;
            this.count = info.count;
            if (this.offset != this.count) {
                this.parse()
            }
        }
    },
    mounted: function () {
        this.parse()
        setInterval(() => {
            this.parse();
        }, 4000);
    }
})
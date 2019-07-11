let app = new Vue({
    el: '#app',
    data: {
        count: 0,
        offset: 0,
        profiles: []
    },
    methods: {
        init ({ response }) {
            this.count = response.count;
            this.profiles = this.profiles.concat(response.profiles);
            this.offset = this.profiles.length;
        }
    },
    mounted: function () {
        setInterval(() => {
            getComments(`https://api.vk.com/method/wall.getComments?owner_id=-184333261&post_id=2&v=5.52&access_token=c6b36f9cc6b36f9cc6b36f9c18c6d8f3c3cc6b3c6b36f9c9b95b850f5f9982b388a7c71&extended=1&count=100&offset=${this.offset}`, 'app.init');
        }, 1000);
    }
})

function getComments (cmd, cb) {
    let script = document.createElement('SCRIPT');
    script.src = `${cmd}&callback=${cb}`;
    document.getElementsByTagName("head")[0].appendChild(script);
}
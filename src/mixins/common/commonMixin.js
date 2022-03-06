export default {
    data() {
        return {
            loading: false,
            loadingTimer: '',
            current_counter: 0,
        }
    },
    methods: {
        runTimer(activate = true) {
            this.current_counter = 0;
            this.loading = false;
            //clear old timer
            if(this.loadingTimer)
                clearInterval(this.loadingTimer);
            if(activate) {
                this.loading = true;
                this.loadingTimer = setInterval(() => {
                    this.current_counter ++;
                    if(this.current_counter > 100) {
                        this.runTimer();
                    }
                }, 300);
            }
        },
    },
}
dycalendar.draw({
    target: '.dycalendar',
    type: 'month',
    dayformat: "full",
    monthformat: "full",
    highlighttargetdate:true,
    prevnextbutton:"show"
});

Vue.createApp({
    data() {
        return {
            offsetSize: 80, //偏移值
            col: '',
            classList: ['active', 'near', 'far', 'far', 'distant', 'distant']
        }
    },
    methods: {
        gettime: () => {
            const t = new Date();
            const h = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
            const m = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
            const s = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds();
            return `${h}${m}${s}`
        },
        getClass(n, i) {
            return this.classList.find(function (_class, classIndex) {
                return i - classIndex === n || i + classIndex === n;
            }) || '';
        }
    },
    mounted() {
        // const _this = this;
        setInterval(() => {
            this.col = document.querySelectorAll('.col');
            const t = this.gettime();
            this.col.forEach((el, i) => {
            // 取得數字
            const getnum = parseInt(t[i]);
            const offsetValue = -getnum * this.offsetSize;
            el.style = `transform: translateY(calc(90vh + ${offsetValue}px - ${ this.offsetSize / 2}px))`;
            // el.style = 'transform: translateY(calc(90vh + ' + offsetValue + 'px - ' + this.offsetSize / 2 + 'px));' 
            console.log(el.style.transform)
            Array.from(el.children).forEach((childel, j) => {
                childel.className = `num ${this.getClass(getnum, j)}`
            })
        });
        }, 1000);
    }
}).mount('#app')
(function(window, Vue) {
    new Vue({
        el: '#app',
        data: {
            dataList: JSON.parse(window.localStorage.getItem('dataList')) || [],
            newTodo: ''
        },
        methods: {
            addTodo() {
                if (!this.newTodo.trim()) return
                this.dataList.push({
                    content: this.newTodo.trim(),
                    isFinish: false,
                    //重新排序 并且得到idz最大的值是多少  然后再加一  成为当前添加的id 值
                    id: this.dataList.length ? this.dataList.sort((a, b) => a.id - b.id)[this.dataList.length - 1]['id'] + 1 : 1
                })
                this.newTodo = ''
            },
            delTodo(index) {
                this.dataList.splice(index, 1)
            },
            delAll() {
                this.dataList = this.dataList.filter(item => !item.isFinish)
            }
        },
        directives: {
            focus: {
                inserted(el) {
                    el.focus()
                }
            }
        },
        watch: {
            dataList: {
                handler(newArr) {
                    window.localStorage.setItem('dataList', JSON.stringify(newArr))
                },
                deep: true
            }
        },
        computed: {
            activeNum() {
                // filter 遍历数组  查找符合条件的   返回一个新的数组   
                return this.dataList.filter(item => !item.isFinish).length
            },
            toggleAll: {
                get() {
                    //every 遍历里面的条件   返回一个布尔值
                    return this.dataList.every(item => item.isFinish)
                },
                set(val) {
                    //循环遍历  把值赋给每一个li的 isFinish
                    this.dataList.forEach(item => item.isFinish = val)
                }
            }
        }
    })
})(window, Vue);
<template>
    <tr>
        <td>{{ code }}</td>
            <td> <input v-model="test1" type="number" @change="(event) => update(event,'test1')"/></td>
            <td> <input v-model="test2" type="number"  @change="(event) => update(event,'test2')"/></td>
            <td> <input v-model="exam" type="number" @change="(event) => update(event,'exam')"/></td>
        <td>{{ total }}</td>
        <td>{{ grade(total) }}</td>

    </tr>
</template>

<script>
    import {ref} from 'vue';
    export default{
        props:{
            course: Object,
            index:Number
        },
        data(){
            return{
                code: ref(this.course.code),
                test1: ref(this.course.test1),
                test2: ref(this.course.test2),
                exam: ref(this.course.exam),
                total: ref(this.course.total),
                score: ref(this.course.score),
            }
        },
        methods:{
            grade(total){
                switch (true) {
        case total > 74:
            return 'A';
        case total > 64:
            return 'B';
        case total > 54:
            return 'C';
        case total > 44:
            return 'D';
        case total > 34:
            return 'E';
        default:
            return 'F';
                 }
            },
            
            update($event, param){
                this.$emit("updateScore",this.code,param,$event.target.value);
            }
            
        },
        watch(){
            
        }


    }
</script>

<style scoped>

 td{
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 1em;
    text-transform: uppercase;
}

input{
      text-align: center;
    width: 1rem;
    height: 1rem;
  }

  
</style>
<script setup>
import {ref, computed} from 'vue'
const month=ref('')
const season=computed(()=> {
if(month.value==='') return''

const n=Number(month.value)
if(isNaN(n)) return''
if(n<1||n>12) return'Tháng không hợp lệ'

if(n>=1 && n<=3) return 'Mùa xuân'
else if(n<=6) return 'Mùa hè'
else if(n<=9) return 'Mùa thu'
else if(n>9) return 'Mùa đông'

})
</script>

<template>
<div>
    <h3>Nhập tháng của năm</h3>

    <input type="number" v-model="month"/>

    <p>{{ season }}</p>
</div>

</template>
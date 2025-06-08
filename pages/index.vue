<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../composables/supabase'


const form = ref({
    first_name : '',
    last_name : '',
    date_of_birth : '',
    reason_for_visit : ''
})

const submissions = ref([])

async function getSubmissions() {
  const { data } = await supabase.from('Form').select()
  submissions.value = data
  console.log('Fetched submissions', submissions.value)
}



onMounted(() => {
    getSubmissions()  
})


</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <form @submit.prevent="">
        <label for="fname">First name:</label>
        <input type="text" id="fname"  name="fname"><br><br>
        <label for="lname">Last name:</label>
        <input type="text" id="lname" name="lname"><br><br>
        <label for="dob">Date of birth:</label>
        <input type="date" id="dob" name="dob"><br><br>
        <label for="reason_for_visit"> What brings you in today?:</label>
        <input type="text" id="reason_for_visit" name="reason_for_visit"><br><br>
        <label for="submit">submit:</label>
        <input id="submit" type="submit">
    </form>

  </div>
</template>
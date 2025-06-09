<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../composables/supabase'

// interface for form input fields
interface FormData{
    first_name: string;
    last_name: string;
    date_of_birth: string;
    reason_for_visit: string
}
interface Submission extends FormData {
    id: number
}
// Reactive form state using the FormData interface
const form = ref<FormData>({
    first_name : '',
    last_name : '',
    date_of_birth : '',
    reason_for_visit : ''
})

const status = ref('')
const id = 0
const submissions = ref<Submission[]>([])

// Fetch all form submissions from the Supabase 'Form' table
async function getSubmissions() {
  const { data } = await supabase.from('Form').select()
  submissions.value = data
  // Testing
  console.log('Fetched submissions', submissions.value)
}

// Insert new form submission into the Supabase 'Form' table
const handleSubmit = async () => {
  const { data, error } = await supabase.from('Form').insert([form.value])
  if (error) {
    status.value = 'error'
    console.error(error)
  } else {
    status.value = 'success'
    
    setTimeout(() => {
    status.value = ''
    }, 3000)
    form.value = { first_name: '', last_name: '', date_of_birth:'', reason_for_visit:'' }
    getSubmissions()
  }
}

// Delete a submission by ID from the Supabase 'Form' table
const handleDelete = async (id: number) => { const {error} = await supabase.from('Form')
  .delete()
  .eq('id', id)

  if (error) {
    console.error('Delete error:', error)
    status.value = 'error'
    return
  }

  status.value = 'delete success'
  setTimeout(() => {
    status.value = ''
  }, 2000)

  getSubmissions()
}

onMounted(() => {
    getSubmissions()  
})

</script>

<template>
    <div >
    <h2 class="form-title">Clear Lakes Dental Checkin Form</h2>
    </div>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
        <label for="fname">First name:</label>
        <input v-model="form.first_name" type="text" id="fname"  name="fname" required><br><br>
        <label for="lname">Last name:</label>
        <input v-model="form.last_name" type="text" id="lname" name="lname" required><br><br>

        <label for="dob">Date of birth:</label>
        <input v-model="form.date_of_birth" type="date" id="dob" name="dob" required><br><br>

        <label for="reason_for_visit"> What brings you in today?</label>
        <input v-model="form.reason_for_visit" type="text" id="reason_for_visit" name="reason_for_visit"><br><br>

        <input id="submit" type="submit">
    </form>
        <div v-if="status === 'success'" class="success">Checked in successfully!</div>
        <div v-if="status === 'delete success'" class="success">Patient deleted!</div>
        <div v-if="status === 'error'" class="error">checkin failed. Try again.</div>
    <div>
        <h2> Checked in</h2>
        <ul>
            <li v-for="item in submissions" :key="item.id" >
                <p> Patient name: {{ item.first_name }} {{ item.last_name }}</p>
                <p> Date of birth: {{ item.date_of_birth }} </p> 
                <p> Reason for visit: {{ item.reason_for_visit }} </p>
                <button @click="handleDelete(item.id)">Delete</button>
            </li>
        </ul>
    </div>

  </div>
</template>

<style scoped>
    .form-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
    }
    input, textarea {
        display: block;
        width: 100%;
        margin: 0.5rem 0;
        padding: 0.5rem;
    }

    .success {
        color: green;
    }

    .error {
        color: red;
    }
    .form-title{
        text-align: center;
    }

</style>
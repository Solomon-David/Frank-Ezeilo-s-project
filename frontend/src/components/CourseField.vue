<template>
    <tr v-if="!isEditing">
            <td><input type="text" v-model="title" /></td>
            <td><input type="text" v-model="code" /></td>
            <td><input type="number" v-model="unit" /></td>
            <td><input type="text" v-model="department" /></td>
            <td><input type="number" v-model="level" /></td>
            <td>
            <button type="button" @click="toggleEdit">Done</button>
            </td>
          </tr>

      <tr v-else>
            <td>{{ title }}</td>
            <td>{{ code }}</td>
            <td>{{ unit }}</td>
            <td>{{ department }}</td>
            <td>{{ level }}</td>
            <td>
              <font-awesome-icon 
                icon="edit" 
                @click="toggleEdit" 
                class="edit-icon"
              />
              <font-awesome-icon 
                icon="trash" 
                @click="deleteCourse()" 
                class="delete-icon"
              />
            </td>
            
          </tr>
  </template>
  
  <script>
  import { getCurrentInstance } from 'vue';

  export default {
  name: 'CourseField',
  props: {
    course: {required:true}
  },
  data() {
    return {
      isEditing: true,
      url:  getCurrentInstance().proxy.url,
      oldcode: '',
      olddepartment:'',
      code:this.course.code,
      department:this.course.department,
      title:this.course.title,
      level:this.course.level,
      unit:this.course.unit,
    };
  },
 
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        console.log(`${this.url}/course/editcourse?code=${encodeURIComponent(this.code)}&department=${encodeURIComponent(this.department)}&title=${encodeURIComponent(this.title)}&level=${encodeURIComponent(this.level)}&unit=${encodeURIComponent(this.unit)}&olddepartment=${encodeURIComponent(this.olddepartment)}&oldcode=${encodeURIComponent(this.oldcode)}`)
        fetch(`${this.url}/course/editcourse?code=${encodeURIComponent(this.code)}&department=${encodeURIComponent(this.department)}&title=${encodeURIComponent(this.title)}&level=${encodeURIComponent(this.level)}&unit=${encodeURIComponent(this.unit)}&olddepartment=${encodeURIComponent(this.olddepartment)}&oldcode=${encodeURIComponent(this.oldcode)}`, 
        {
          method: 'PATCH' })
        .then(res => res.text())
        .then((res)=>alert(res))
        .catch((err) => alert(err))
        .finally(()=>{
            this.$emit("update")
        })
      }
    },
    deleteCourse(){
        this.$emit("delete",{code: this.oldcode, department: this.olddepartment});
    }
    },

    mounted(){
        this.oldcode=this.code;
        this.olddepartment=this.department
    }
  }



  </script>
  
  <style scoped>
   .edit-icon, .delete-icon {
    color: #333;
    cursor: pointer;
    margin-right: 8px;
  }
  
  .edit-icon:hover {
    color: #6c5ce7;
  }
  
  .delete-icon {
    color: #6c5ce7;
  }
  
  .delete-icon:hover {
    color: #6c5ce7;
  }

  
  td, input{
    padding: 0.25rem;
    border: none;
    text-align: left;
    font-size: 0.8em;
    text-transform: capitalize;
    
  }

  input{
    width:90%;
    border:0.5px solid grey;

  }

  td:nth-of-type(2){
    text-transform: uppercase;
  }

  td:last-child{
    display:flex;
  }
  
  </style>
  
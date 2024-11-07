<template>
    <div class="profile-field">
      <div v-if="!isEditing">
        <b>{{ field }} : </b>
        <span  @click="toggleEdit">{{ value }}</span>
      </div>

      <input
        v-else
        :type="value instanceof Number ? 'number' : 'text'"
        v-model="newValue"
        
        
        @keyup.enter="toggleEdit"
        ref="input"
      />
    </div>
  </template>
  
  <script>

  export default {
  name: 'ProfileField',
  props: {
    type:{
      type:String
    },
    value: {
      required: true
    },
    field: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      newValue: this.value,
      oldValue: this.value
    };
  },
 
  methods: {
    toggleEdit() {
      // Toggle edit mode and set up focus on the input if entering edit mode
      this.isEditing = !this.isEditing;
      
      if (this.isEditing) {
        // Set the input value to the current prop value and focus
        console.log(this.newValue, this.oldValue)
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      } else {
        // Make the PATCH request with the updated `newValue`
        fetch(`${this.url}/${this.type}/profile?field=${this.field}&oldvalue=${this.oldValue}&newvalue=${this.newValue}`, {
          method: 'PATCH'
        })
        .then(res => res.json())
        .then(res => {
          alert("done");

          // Update oldValue after successful PATCH and emit newValue to parent
          
          console.log(res)
          console.log(res.result)
          if(res.result[this.field]==this.newValue){
          this.$emit("update",res.result)
          console.log(this.newValue, this.oldValue, this.field)
          this.oldValue=this.newValue;
          }
          else{
            console.log("error")
          }
        })
        .catch((err) => alert(err));
      }
    }
  },

};


  </script>
  
  <style scoped>
  .profile-field {
    margin: 10px 0;
    cursor: pointer;
  }
  
  input {
    width: 100%;
    padding: 5px;
    font-size: 16px;
  }

  b{
    text-transform: capitalize;
  }
  </style>
  
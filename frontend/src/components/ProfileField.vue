<template>
    <div class="profile-field">
      <div v-if="!isEditing">
        <b>{{ field }} : </b>
        <span  @click="toggleEdit">{{ value }}</span>
      </div>

      <input
        v-else
        type="text"
        :value="newValue"
        
        @keyup.enter="toggleEdit"
        @blur="toggleEdit"
        ref="input"
      />
    </div>
  </template>
  
  <script>
  export default {
  name: 'ProfileField',
  props: {
    value: {
      type: String,
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
      
      oldValue: this.value
    };
  },
  mounted(){
    this.oldValue=this.value
  },
  methods: {
    toggleEdit() {
      // Toggle edit mode and set up focus on the input if entering edit mode
      this.isEditing = !this.isEditing;
      
      if (this.isEditing) {
        // Set the input value to the current prop value and focus
        this.newValue = this.value;
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      } else {
        // Make the PATCH request with the updated `newValue`
        fetch(`${this.url}/student/profile?field=${this.field}&oldvalue=${this.oldValue}&newvalue=${this.newValue}`, {
          method: 'PATCH'
        })
        .then(res => res.text())
        .then(res => {
          alert(res);
          // Update oldValue after successful PATCH and emit newValue to parent
          
          console.log(this.newValue, this.oldValue, this.field)
        })
        .catch((err) => alert(err));
      }
    }
  },
  watch: {
    // Watch for changes in `value` prop and update `newValue` to sync changes
    value(newVal) {
      if (!this.isEditing) {
        this.newValue = newVal;
      }
    }
  }
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
  
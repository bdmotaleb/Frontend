import Vue from "vue";

Vue.mixin({
  methods: {
    confirm: function (callback) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) callback();
      })
    },

    loadImage: function (e) {
      let file = e.target.files[0];
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        let reader = new FileReader();
        reader.onload = e => {
          this.form.image = e.target.result;
        }
        reader.readAsDataURL(file);
      } else {
        this.form.image = '';
        this.$refs.image.value = null;
        Toast.fire({
          icon: 'error',
          title: 'Please select valid image jpg or png.'
        })
      }
    },

    fileLink: function (name) {
      if (name !== null && name.length < 30)
        return 'http://127.0.0.1:8000/uploads/products/' + name;
      else
        return this.form.image;
    },

    imageViewLink: function (image) {
      if (image !== null && image.length < 30)
        return 'http://127.0.0.1:8000/uploads/products/' + image;
      else
        return image;
    }
  }
});

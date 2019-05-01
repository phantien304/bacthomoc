<template>
    <div>
        <h3 v-on:click="$event.target.nextElementSibling.click()">
            {{ title }}</h3>
        <input type="file" @change="onFileChange" name="avatar" class="hide"/>
        <div id="preview">
            <img :src="displayAvatar" class="rounded mr-2 mo-mb-2"/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'file-image',
        props: ['file', 'title', 'photoField'],
        data() {
            return {
                url_api:this.$store.state.url_api
            }
        },
        computed: {
            displayAvatar() {
                let _src = '';
                if (this.file)
                    _src = this.url_api + this.file;
                else return this.url_api +'assets/noimg.png';
                if (_src.lastIndexOf('http') != -1 && _src.lastIndexOf('data:image/') != -1)
                    _src = this.file;
                return _src;
            },
        },
        methods: {
            onFileChange(e) {
                let fileReader = new FileReader();
                fileReader.readAsDataURL(e.target.files[0]);
                fileReader.onload = (e) => {
                    //this.url_image =  e.target.result;
                    this.$emit('getFile', e.target.result, this.photoField);
                };
            },
        }
    }
</script>

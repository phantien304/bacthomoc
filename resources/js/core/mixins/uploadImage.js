import Vue from 'vue';


Vue.mixin({
    methods: {
        _uploadBase64(base64) {
            var me = this;
            return new Promise((resolve, reject) => {
                this.$http({
                    data: {
                        m: "file",
                        fn: "get_token",
                        filename: file.name
                    }
                }).then((response) => {
                    let data = response.data;

                    this.$http({
                        url: this.appSettings.storageApiUrl + '?fn=upload_base64',
                        method: 'POST',
                        data: {
                            token: data,
                            base64: base64
                        },
                        withCredentials: true,
                        headers: { 'crossDomain': true }
                    }).then((response) => {
                        resolve(response);
                    });

                }).catch(err => {
                    reject();
                    console.log(err);
                });;
            })
        },
        _uploadFile(file) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                formData.append('file', file);
                this.$http({
                    data: {
                        m: "file",
                        fn: "get_token",
                        filename: file.name
                    }
                }).then((response) => {
                    let data = response.data;
                    formData.append('token', data);
                    return this.$http(
                        {
                            url: this.appSettings.storageApiUrl + '?fn=upload',
                            formData: true,
                            data: {
                                token: data,
                                file: file
                            },
                            checkResponse: false
                        },
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then((res) => {
                        return resolve(res.data);
                    }).catch(() => {
                        return reject('Không tải được file lên, vui lòng kiểm tra lại hoặc báo quản trị viên!');
                    });
                });
            });
        }
    }
});
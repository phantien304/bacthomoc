import Vue from 'vue';
import alert from 'sweetalert2';

Vue.prototype.$confirm = (msg, title, okLabel, cancelLabel) => {
    return new Promise((resolve, reject) => {
        alert.fire({
            title: title || 'Are you sure?',
            text: msg,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#4cae4c',
            confirmButtonText: okLabel || 'Ok',
            cancelButtonText: cancelLabel || 'Cancel',
        }).then((res) => {
            if (res.value) {
                return resolve();
            }
        });
    });
};


Vue.prototype.$message = (msg, type) => {
    return new Promise((resolve, reject) => {
        alert.fire({
            type: type || 'success',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        }).then((res) => {
            if (res.value) {
                return resolve();
            }
        });
    });
};


Vue.prototype.$success = (msg, type) => {
    return new Promise((resolve, reject) => {
        alert({
            type: 'success',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        });
    });
};

Vue.prototype.$error = (msg, type) => {
    return new Promise((resolve, reject) => {
        alert({
            type: 'error',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        });
    });
};

Vue.prototype.$info = (msg, type) => {
    return new Promise((resolve, reject) => {
        alert({
            type: 'info',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        });
    });
};

import Swal from 'sweetalert2';

export const displaySuccess = (res) => {
    const {message} = res;
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: message || 'Done successfully!',
        showConfirmButton: false,
        timer: 1500
    });
}

export const displayError = (res) => {
    const {message} = res;
    Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: message || 'Something went wrong!',
        showConfirmButton: false,
        timer: 1500
    });
}


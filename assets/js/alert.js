const Alert = {
    typeAlert:{
        danger: 'alert-danger',
        success: 'alert-success'
    },
    typeIcon:{
        exclamation: 'fa-triangle-exclamation',
        check: 'fa-circle-check'

    }
};

function funAlert(id, typeAlert, typeIcon, message){

    return `<div id="${id}" class="alert ${typeAlert} alert-dismissible d-flex align-items-center w-100" role="alert">
                <i class="fa-solid ${typeIcon} bi flex-shrink-0 me-2"></i>
                <div>
                    ${message}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;

}
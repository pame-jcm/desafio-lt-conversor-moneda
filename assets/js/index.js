    const intlForFecha = new Intl.DateTimeFormat('fr-CA', {year: "numeric", month: "2-digit", day: "2-digit"});
    const ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, { type: 'line', data: [], options: {} });
    let idPesos = document.getElementById('idPesos');
    let selectMoneda = document.getElementById('selectMoneda');
    let idBtnBuscar = document.getElementById('idBtnBuscar');
    let idResponseMoneda = document.getElementById('idResponseMoneda');
    let divAlert = document.getElementById('divAlert');
    let data = {};

    document.addEventListener('DOMContentLoaded',() => {

        idPesos.focus();

        getApiMoneda();

    });   
   
    async function getApiMoneda(){
        try{
            const res = await fetch("https://mindicador.cl/api");
            
            data = await res.json();

            if (data){
                divAlert.innerHTML = funAlert('AlertSuccess',Alert.typeAlert.success, Alert.typeIcon.check, 'Datos Cargados Exitosamente!!!');
            }
            //toast.show();
        }catch(e){
            divAlert.innerHTML = funAlert('AlertDanger',Alert.typeAlert.danger, Alert.typeIcon.exclamation, 'Ocurrió un error en la Carga de datos.');
        }
    }

    async function getApiHistoricoMoneda(moneda){
        try{
            //console.log(`https://mindicador.cl/api/${moneda}`);
            const res = await fetch(`https://mindicador.cl/api/${moneda}`);
            
            let dataHistorico = await res.json();

            if (dataHistorico){
                divAlert.innerHTML = funAlert('AlertSuccess',Alert.typeAlert.success, Alert.typeIcon.check, 'Datos Cargados Exitosamente!!!');
            }
            //toast.show();
            return dataHistorico;
        }catch(e){
            divAlert.innerHTML = funAlert('AlertDanger',Alert.typeAlert.danger, Alert.typeIcon.exclamation, 'Ocurrió un error en la Carga de datos.');
        }
    }

    

    idBtnBuscar.addEventListener('click', async (e) => {
        try{
            let mon = data[selectMoneda.value];

            if (mon){
                idResponseMoneda.innerHTML = `Resultado: $ ${number_format(parseFloat(idPesos.value) * mon.valor,2)}`;
                let d = await getApiHistoricoMoneda(selectMoneda.value);
                //console.log(d);
                generateData(d);

                document.getElementById('myChart').classList.remove('d-none');
            }else{
                document.getElementById('myChart').classList.add('d-none');
                divAlert.innerHTML = funAlert('AlertDanger',Alert.typeAlert.danger, Alert.typeIcon.exclamation, 'Ocurrió un error en la Carga de datos.');
            }
            idPesos.focus();
        }catch(e){
            divAlert.innerHTML = funAlert('AlertDanger',Alert.typeAlert.danger, Alert.typeIcon.exclamation, 'Ocurrió un error en la Carga de datos.');
        }
        
    });
    

    function number_format(num, decimals = 0) {

        num += ''; // por si pasan un numero en vez de un string
        num = parseFloat(num.replace(/[^0-9\.]/g, '')); // elimino cualquier caracter excepto numeros o puntos

        // si no es un numero o es igual a cero retorno el mismo cero
        if (isNaN(num) || num === 0) 
            return parseFloat(0).toFixed(decimals);

        // si es mayor o menor que cero retorno el valor formateado como numero
        num = '' + num.toFixed(decimals);

        var num_parts = num.split('.'),
            regexp = /(\d+)(\d{3})/;

        while (regexp.test(num_parts[0]))
            num_parts[0] = num_parts[0].replace(regexp, '$1' + '.' + '$2');
        
        return num_parts.join(',');
    }


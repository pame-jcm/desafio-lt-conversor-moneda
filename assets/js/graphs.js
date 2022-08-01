const CHART_COLORS = {
    quick: 'rgb(61, 201, 251,0.5)',
    quick_blue: 'rgb(61, 143, 251)'
  };

const generateData = (dataH) => {
    
    let data = dataH.serie.slice(0,10);

    myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'line',
        data : {
            labels: data.map((data)=> intlForFecha.format(new Date(data.fecha))).reverse(),
            datasets: [
              { label: 'Valor',
                data: data.map((data) => data.valor).reverse(),
                borderColor: CHART_COLORS.quick_blue,
                backgroundColor: CHART_COLORS.quick,
                fill: true,
                pointStyle: 'rectRounded',
                pointRadius: 10,
                pointHoverRadius: 15
              }
            ]
          },
          options: {
            plugins: {
              filler: {
                propagate: false,
              },
              title: {
                display: true,
                text: `${dataH.nombre} en ${dataH.unidad_medida}`
              },
              subtitle: {
                display: true,
                text: `Fuente ${dataH.autor} versión ${dataH.version}`
              }
            },
            interaction: {
              intersect: false,
            }
          }
    });
};




  
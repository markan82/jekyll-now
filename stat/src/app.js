function randerChart({context, labels, label, data, title, xLabel, yLabel, backgroundColor, borderColor}) {
  new Chart(document.getElementById(context).getContext("2d"), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        fill: false,
        backgroundColor: backgroundColor || '#A8C8F990',
        borderColor: borderColor || '#A8C8F9FF',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: title,
        fontSize: 16,
        fontFamily: "'맑은 고딕', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: !!xLabel,
            labelString: xLabel
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: !!yLabel,
            labelString: yLabel
          }
        }]
      }
    }
  });
}

function renderMultiChart({context, title, labels, label1, label2, data1, data2}) {
  var lineChartData = {
    labels: labels,
    datasets: [{
      label: label1,
      borderColor: '#A8C8F990',
      backgroundColor: '#A8C8F9FF',
      fill: false,
      data: data1,
      yAxisID: 'y-axis-1',
    }, {
      label: label2,
      borderColor: '#FC9EBD90',
      backgroundColor: '#FC9EBDFF',
      fill: false,
      data: data2,
      yAxisID: 'y-axis-2'
    }]
  };
  const ctx = document.getElementById(context).getContext('2d');
  Chart.Line(ctx, {
    data: lineChartData,
    options: {
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: true,
        text: title
      },
      scales: {
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-1',
        }, {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'right',
          id: 'y-axis-2',

          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }],
      }
    }
  });
}
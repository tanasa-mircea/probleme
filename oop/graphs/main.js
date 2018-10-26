document.addEventListener("DOMContentLoaded", function() {
  var graphFactory = new GraphFactory();

  getConfig('pie-chart.json')
    .then(function (response) {
      var pie = graphFactory.create('pie', JSON.parse(response));
      document.getElementById('displayer').appendChild(pie.element);
    });

  getConfig('doughnut-chart.json')
    .then(function (response) {
      var doughnut = graphFactory.create('doughnut', JSON.parse(response).data[0]);
      document.getElementById('displayer').appendChild(doughnut.element);
    });

  getConfig('doughnut-chart.json')
    .then(function (response) {
      var doughnut2 = graphFactory.create('doughnut', JSON.parse(response).data[1]);
      document.getElementById('displayer').appendChild(doughnut2.element);
    });

  getConfig('horizontal-bar-chart.json')
    .then(function (response) {
      var horizontalBar = graphFactory.create('horizontalBar', JSON.parse(response));
      document.getElementById('displayer').appendChild(horizontalBar.element);
    });

  getConfig('vertical-bar-chart.json')
    .then(function (response) {
      var verticalBar = graphFactory.create('verticalBar', JSON.parse(response));
      document.getElementById('displayer').appendChild(verticalBar.element);
    });
});

const getConfig = function(file) {
  return new Promise(function(resolve, reject) {
    // return resolve(pieChartConfig);
    let request = new XMLHttpRequest();
    request.onload = resolve;
    request.onerror = reject;
    request.overrideMimeType("application/json");
    request.open('GET', 'http://localhost/charts-data/reader.php' + '?file=' + file, true);
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve(request.responseText);
      }
    };

    request.send(null);
  });
};
document.addEventListener("DOMContentLoaded", function() {
  var graphFactory = new GraphFactory();

  getConfig('pie-chart.json')
    .then(function (response) {
      var pie = graphFactory.create('pie', JSON.parse(response));
      document.getElementById('displayer').appendChild(pie.element);
    });

  getConfig('doughnut-chart.json')
    .then(function (response) {
      console.log('JSON.parse(response).data[0] ', JSON.parse(response).data[0]);
      var doughnut = graphFactory.create('doughnut', JSON.parse(response).data[0]);
      document.getElementById('displayer').appendChild(doughnut.element);
    });

  getConfig('doughnut-chart.json')
    .then(function (response) {
      console.log('JSON.parse(response).data[1] ', JSON.parse(response).data[1]);
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

var pieChartConfig = "{\"data\":[{\"label\":\"Test1\",\"value\":25,\"additionalClass\":\"test-class\"},{\"label\":\"Test2\",\"value\":100},{\"label\":\"Test3\",\"value\":25},{\"label\":\"Test4\",\"value\":45},{\"label\":\"Test5\",\"value\":60}], \"legend\": true}";

// const getConfig = function(file) {
//   return fetch('http://localhost/charts-data/' + file, { mode: 'no-cors' });
// };
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
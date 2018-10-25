document.addEventListener("DOMContentLoaded", function() {
  readFileP('data/pie-chart.json')
    .then(function(response) {
      var config = JSON.parse(response);

      var graphFactory = new GraphFactory();
      var pie = graphFactory.create('pie', config);
      var doughnut = graphFactory.create('doughnut', {data: {percentage: 34, label: 'test'}});
      var doughnut2 = graphFactory.create('doughnut', {data: {percentage: 68, label: 'test2'}});
      var horizontalBar = graphFactory.create('horizontalBar', config);
      var verticalBar = graphFactory.create('verticalBar', config);

      document.getElementById('displayer').appendChild(pie.element);
      document.getElementById('displayer').appendChild(doughnut.element);
      document.getElementById('displayer').appendChild(doughnut2.element);
      document.getElementById('displayer').appendChild(horizontalBar.element);
      document.getElementById('displayer').appendChild(verticalBar.element);
    });
});

// var pieChartConfig = "{\"data\":[{\"label\":\"Test1\",\"value\":25,\"additionalClass\":\"test-class\"},{\"label\":\"Test2\",\"value\":75},{\"label\":\"Test2\",\"value\":25}]}";
var pieChartConfig = "{\"data\":[{\"label\":\"Test1\",\"value\":25,\"additionalClass\":\"test-class\"},{\"label\":\"Test2\",\"value\":100},{\"label\":\"Test3\",\"value\":25},{\"label\":\"Test4\",\"value\":45},{\"label\":\"Test5\",\"value\":60}]}";

const readFileP = function(file) {
  return new Promise(function(resolve, reject) {
    return resolve(pieChartConfig);
    let request = new XMLHttpRequest();
    // request.onload = resolve;
    request.onerror = reject;
    request.overrideMimeType("application/json");
    request.open('GET', file, true);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            resolve(request.responseText);
        }
    };
    request.send(null);
  });
};
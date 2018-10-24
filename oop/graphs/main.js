document.addEventListener("DOMContentLoaded", function() {
  readFileP('data/pie-chart.json')
    .then(function(response) {
      var config = JSON.parse(response);
      var graphFactory = new GraphFactory();
      var chart = graphFactory.create('pie', config);

      document.getElementById('displayer').appendChild(chart.element);
    });
});

var pieChartConfig = "{\"data\":[{\"label\":\"Test1\",\"value\":25,\"additionalClass\":\"test-class\"},{\"label\":\"Test2\",\"value\":100},{\"label\":\"Test3\",\"value\":25},{\"label\":\"Test3\",\"value\":50},{\"label\":\"Test3\",\"value\":60}]}";

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
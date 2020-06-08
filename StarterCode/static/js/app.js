
function Charts (ID) {
  filename = 'samples.json'
  d3.json(filename).then((importedData) => {
     var data = importedData.samples;
    
     
     console.log(data);
    
     console.log(ID);
     
 var result = data.filter(sample => sample.id == ID)[0]

    console.log(result);
     sampleInput = result.sample_values.slice(0, 10).reverse();
     console.log(sampleInput);
 
     otuIDs = result.otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
     
     console.log(otuIDs);
 
 
     otuLabels = result.otu_labels.slice(0, 10).reverse(); 
     console.log(otuLabels);
 
   var trace1 = {
     x: sampleInput,
     y: otuIDs,
     text: otuLabels,

     name: "",
     type: "bar",
     orientation: "h"
   };
 
  
   var chartInput1 = [trace1];
 
   
   var layout = {
     title: "",

   };
 
   //plot 
   Plotly.newPlot("bar", chartInput1, layout);




// bubble plot using plotly
     var trace2 = {
      x: result.otu_ids,
      y: result.sample_values,
      text: result.otu_labels,
      mode: 'markers',
      marker: {
        size: result.sample_values,
        color: result.otu_ids
        
      }
    };
    
    var chartInput2 = [trace2];
    
    var layout2 = {
      title: '',
      xaxis: {
      title: {
          text: 'OTU ID'}},
      showlegend: false,
      
    };
    
    Plotly.newPlot('bubble', chartInput2, layout2);
  
  // DEMOGRAPHIC INFO 
  var mtadata = importedData.metadata;

  
var myresult = mtadata.filter(sample => sample.id == ID)[0]
var sample_metadata = d3.select("#sample-metadata");
   sample_metadata.html("");
  
       Object.entries(myresult).forEach(function([key, value]) {
       console.log(key, value);
      
       var row = sample_metadata.append("p");
     
       row.text(`${key}: ${value}`);
      
     });

//GAUGE PLOT 


var gaugedata = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: myresult.wfreq,
    title: { text: "Belly Button Washing Frequency  Scrubs per Week" },
    type: "indicator",
    mode: "gauge+number",
    
    gauge: {
      axis: { range: [null, 9] },
      steps: [
        { range: [0, 1], color: "Blue" },
        { range: [1, 2], color: "Cyan" },
        { range: [2, 3], color: "Blue" },
        { range: [3, 4], color: "Blue" },
        { range: [4, 5], color: "cyan" },
        { range: [5, 6], color: "Blue" },
        { range: [6, 7], color: "cyan" },
        { range: [7, 8], color: "Blue" },
        { range: [8, 9], color: "cyan" }

      ],

      threshold: {
        line: { color: "red", width: 3 },
        thickness: 0.50,
      
      }
    }
  }
];

var gaugelayout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', gaugedata, gaugelayout);
    
 });
 
}
 






function init() {
  var dropdownMenu = d3.select("#selDataset");
  filename = 'samples.json'
 d3.json(filename).then((importedData) => {

    var names = importedData.names;
    names.forEach((sample)=> {
      dropdownMenu.append("option").text(sample).property("value", sample)
    })
    Charts(names[0])
  });
}

init();



function optionChanged(id) {

  
  Charts(id)
};

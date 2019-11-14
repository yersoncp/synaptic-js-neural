/**
 * https://scrimba.com/g/gneuralnetworks
 */

const { Layer, Network } = window.synaptic;

let inputLayer = new Layer(2);
let hiddenLayer = new Layer(3);
let outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var myNetwork = new Network({
   input: inputLayer,
   hidden: [hiddenLayer],
   output: outputLayer
});

var learningRate = .3;

for (var i = 0; i < 20000; i++) {
   // 0,0 => 0  
   myNetwork.activate([0, 0]);
   myNetwork.propagate(learningRate, [0]);

   // 0,1 => 1  
   myNetwork.activate([0, 1]);
   myNetwork.propagate(learningRate, [1]);

   // 1,0 => 1  
   myNetwork.activate([1, 0]);
   myNetwork.propagate(learningRate, [1]);

   // 1,1 => 0  
   myNetwork.activate([1, 1]);
   myNetwork.propagate(learningRate, [0]);
}

var exported = myNetwork.toJSON();
var imported = Network.fromJSON(exported);

console.log('exported', exported);
console.log('imported', imported);

console.log(myNetwork.activate([0, 0]));
console.log(myNetwork.activate([0, 1]));
console.log(myNetwork.activate([1, 0]));
console.log(myNetwork.activate([1, 1]));  
/**
 * https://github.com/wagenaartje/neataptic
 */
const { Architect, Trainer } = window.synaptic;

var INPUT_LENGTH = 7;
var myNetwork = new Architect.Perceptron(INPUT_LENGTH, 6, 1);

function convertNameToInput(name) {
   name = name.toLowerCase();
   if (name.length > INPUT_LENGTH)
      name = name.substring(INPUT_LENGTH);
   while (name.length < INPUT_LENGTH)
      name = " " + name;
   var characters = name.split("");
   return characters.map(
      (c) => c == " " ? 0 : c.charCodeAt(0) / 1000
   );
}

var females = [ "Abril", "Acacia", "Ada", "Adabela", "Adelia", "Adela", "Adelaida", "Adelina", "Adelina", "Adoración", "Adriana", "África", "Afrodita", "Ágata", "Agostina", "Agripina", "Águeda", "Agustina", "Aída", "Ainoa", "Aitana", "Alba", "Albana", "Albina", "Alberta", "Albertina", "Alda", "Aldana", "Alegra", "Alegría", "Alejandra", "Alejandrina", "Alexia", "Alexandra", "Alfonsa", "Alfonsina", "Alfreda", "Alicia", "Alida", "Alina", "Alionora", "Alondra", "Alma", "Almendra", "Almudena", "Altagracia", "Altea", "Amada", "Amalia", "Amancay", "Amanda", "Amapola", "Amaya", "Ámbar", "Amelia", "América", "Amparo", "Ana", "Anabel", "Anabella", "Anaclara", "Anahí", "Anáis", "Anastasia", "Andrea", "Andreína", "Ángela", "Ángeles", "Angélica", "Angelina", "Angie", "Angustias", "Ania", "Antea", "Antonela", "Antolina", "Antonieta", "Antonia", "Antonina", "Anunciación", "Anunciata", "Apia", "Apolonia", "Aquilina", "Arabela", "Araceli", "Arantxa", "Aránzazu", "Arcadia", "Argentina", "Ariadna", "Ariana", "Armonía", "Artemisa", "Aroa", "Ascensión", "Astrid", "Asunción", "Asunta", "Atala", "Atalanta", "Atanasia", "Atenea", "Augusta", "Áurea", "Aurelia", "Aureliana", "Aurora", "Auxiliadora", "Ayelen", "Azalea", "Azucena"]

var males = [ "Abel", "Abelardo", "Abraham", "Adalberto", "Adán", "Adelardo", "Adolfo", "Adrián", "Adriano", "Adulfo", "Agustín", "Aitor", "Alan", "Alban", "Albano", "Alberto", "Alejandro", "Alejo", "Alex", "Alexandro", "Alfonso", "Alf", "Alfredo", "Alonso", "Álvaro", "Alvar", "Amador", "Ambrosio", "Américo", "Anastasio", "Andrés", "Ángel", "Aníbal", "Aniceto", "Anselmo", "Antolín", "Antonio", "Apolo", "Apolonio", "Aquiles", "Arcadio", "Ariel", "Armando", "Arturo", "Atanasio", "Ataúlfo", "Augusto", "Aureliano", "Aurelio" ]

var trainingData = [];
var trainer = new Trainer(myNetwork);
for (var i = 0; i < females.length; i++) {
   trainingData.push({
      input: convertNameToInput(females[i]),
      output: [0] // Male = false, Female = true
   });
}
for (var i = 0; i < males.length; i++) {
   for (var j = 0; j < 2; j++) {
      trainingData.push({
         input: convertNameToInput(males[i]),
         output: [1] // Male = true, Female = false
      });
   }
}

for (var i = 0; i < 25; i++) {
   trainer.train(trainingData, {
      rate: 0.01,
      iterations: 200,
      shuffle: true,
      cost: Trainer.cost.MSE
   });
   var error = trainer.test(trainingData)["error"];
   console.log(
      "Iteration " + ((i + 1) * 200) + " --> Error: " + error
   );
}

function getGender(name) {
   var result = myNetwork.activate(convertNameToInput(name));
   console.log(result);
}
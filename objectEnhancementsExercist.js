//same keys and values
function createInstructor(firstName, lastName) {
    return {
        firstName,
        lastName
    }
}

//computed property names
let favoriteNumber = 42;
const instructor = {
    firstName: "Colt",
    [favoriteNumber] : "That is my favorite!"
}

//object methods
const instructor = {
    firstName: "Colt",
    sayHi(){
      return "Hi!";
    },
    sayBye(){
      return this.firstName + " says bye!";
    }
  }

//createAbunak function
function createAnimal(species, call, noise) {
    return {
        species,
        [call](){
            return noise;
        }
    }
}
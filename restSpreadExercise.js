function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function(num) {
    return num % 2 === 0
  });
}

/* Write an ES2015 Version */
function filterOutOdds() {
  return (...args) => args.filter(v => v % 2 === 0);
}
/* End */

//Finds minimum value
function findMin (...args) {
  let smallestNum = args.reduce((min, num) => {
    return num < min ? num : min;
  })
  return smallestNum;
}

//Merge objects
function mergeObjects(objOne, objTwo) {
  return {...objOne, ...objTwo};
}

//doubleAndReturnArgs
function doubleAndReturnArgs(array, ...args) {
  const newArray = [...array];
  args.map((arg) => {
    newArray.push(arg * 2);
  })
  return newArray;
}

//Slice and Dice
/** remove a random element in the items array
and return a new array without that item. */
const removeRandom = (items) => {
  const arrayCopy = [...items];
  let index = Math.floor(Math.random() * arrayCopy.length);
  arrayCopy.splice(index, 1);
return arrayCopy;
}

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => {return [...array1, ...array2]};


/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => {
  let newObj = {...obj};
  newObj[key] = val;
  return newObj;
}

/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
  let newObj = {...obj};
  delete newObj[key];
  return newObj;
}


/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => {
  return newObj = {...obj1, ...obj2};
}


/** Return a new object with a modified key and value. */

const update(obj, key, val) => {
  let newObj = {...obj};
  newObj[key] = val;
  return newObj;
}

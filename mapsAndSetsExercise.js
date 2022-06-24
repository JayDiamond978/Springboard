new Set([1,1,2,2,3,4]); //returns [1,2,3,4]

[...new Set("referee")].join("") //returns "ref"

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);
/*
returns   0: {Array(3) => true}
          1: {Array(3) => false}
*/

function hasDuplicate(array) {
    return new Set(array).size !== array.length;
}

function vowelCount(str) {
    const vowels = "aeiou";
    const vowelMap = new Map();
    
    for (let char of str) {
        let lowerCase = char.toLowerCase();
        if (vowels.includes(char)) {
            if (vowelMap.has(lowerCase)) {
                vowelMap.set(lowerCase, vowelMap.get(lowerCase) +1);
            } else {
                vowelMap.set(lowerCase, 1);
            }
        }
    }
    return vowelMap;
}
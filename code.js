const SIZE = 6

const regExpZeros = new RegExp("0", "g");
const regExpOnes = new RegExp("1", "g");

const getRandomNumber = (max, min = 0) => {
  return Math.round(Math.random() * (max - min)) + min;
}

const arrayFromLength = (length) => {
  return Array.from(new Array(length).keys()).map(n => "");
}

function generateRows(n) {
  const res = []
  const max = 2 ** n;

  for (let i = 0; i < max; i++) {
    const str = (i.toString(2).padStart(n, "0")).toString()

    if (str.includes('000') 
    	|| str.includes('111') 
    	|| str.match(regExpZeros).length > SIZE / 2
    	|| str.match(regExpOnes).length > SIZE / 2) {
      continue;
    }
    res.push(str);
  }
  return res
}

function defineNextRow(columns) {

	let next = '';

	columns.forEach((column) => {
		if (column.slice(-2) == "00") {
			next += '1'
		} else if (column.slice(-2) == "11") {
			next += '0'
		} else if (column.includes('0') && column.match(regExpZeros).length == SIZE / 2) {
			next += '1'
		} else if (column.includes('1') && column.match(regExpOnes).length == SIZE / 2) {
			next += '0'
		} else {
			next += 'x'
		}
	})

	return next;
}

function generate() {
  const result = []
  const columns = arrayFromLength(SIZE)
  let elements = generateRows(SIZE)

  for (let i = 0; i < SIZE; i++) {

  	let index = getRandomNumber(elements.length - 1)
    let element = elements[index]

    if (i > 1) {
    	let next = defineNextRow(columns);

    	const filteredElements = elements.filter(elem => {
    		let isNext = true

    		for (let j = 0; j < SIZE; j++) {
    			if (next[j] == 'x') continue;
    			if (elem.split('')[j] != next[j]) {
    				isNext = false
    				break;
    			}
    		}

    		return isNext
    	})

    	if (i == SIZE - 1) {
    		element = next
    		index = 0
    	} else {
    		if (!filteredElements.length) return false;
    		//console.log("NEXT: ", next)
    		//console.log("ALL: ", elements)
    		//console.log("FILTERED: ", filteredElements)
    		index = getRandomNumber(filteredElements.length - 1);
	    	element = filteredElements[index]
	    	index = elements.indexOf(element)

    	}
    	//console.log("FILTERED: ", filteredElements)
		//console.log("NEXT: ", next)	
    }
    result.push(element)

    //console.log("ELEMENT: ", element)

    for (let j = 0; j < element.length; j++) {
    	columns[j] += element[j]
    }

    if (index == 0) {
      elements = elements.splice(1)
    } else if (index == elements.length - 1) {
      elements.pop()
    } else {
      elements = [...elements.slice(0, index), ...elements.slice(index + 1)]
    }
    console.log(result[i])
  }
  //console.log(columns)
}

generate()
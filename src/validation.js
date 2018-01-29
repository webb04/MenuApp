const NUMBER_OF_CUSTOMERS = 2;

export const atLeastTwoMains = (selected, errors = []) => {
  // At least 2 mains
  if (selected.filter(dish => dish.type === 'main').length < NUMBER_OF_CUSTOMERS || selected.length < NUMBER_OF_CUSTOMERS * 2) {
    errors.push('Each person must have at least two courses, one of which must be a main.');
  }
  return errors;
}

export const noDupeCourses = (selected, errors = []) => {
  // No more than one of the same course
  const main = selected.filter(dish => dish.type === 'main').length > NUMBER_OF_CUSTOMERS;
  const starter = selected.filter(dish => dish.type === 'starter').length > NUMBER_OF_CUSTOMERS;
  const dessert = selected.filter(dish => dish.type === 'dessert').length > NUMBER_OF_CUSTOMERS;
  if (main || starter || dessert) errors.push('Each diner cannot have more than one of the same course.')
  return errors;
}

export const pierreRule = (names, errors = []) => {
  if (names.indexOf("Salmon fillet") >= 0 && names.indexOf("Prawn Cocktail") >= 0) {
    errors.push('Pierre strongly advises against the prawn cocktail and salmon filltet combination');
  }
  return errors;
}

export const checkQuantityLeft = (selected, names, errors = []) => {
  const overQuantity = [];
  const original = {};
  selected.forEach(dish => original[dish.name] = dish.quantityLeft );

  names.forEach(name => {
    if (original[name] < names.filter(dish => name === dish).length) {
      overQuantity.push(name);
    }
  })

  if (overQuantity.length > 0) {
    const quantityMessage = [...new Set(overQuantity)].map(dish => ` ${original[dish]} ${dish} left`).join(',');
    errors.push(`We only have${quantityMessage}.`);
  }
  return errors;
}

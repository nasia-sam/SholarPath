export const isRequired = (val) => !!val || 'Απαραίτητο Πεδίο.'

export const isValidEmai = (val) => (val && val.match(/^[\w-.]+@([\w-]+\.)+[\w-]{1,4}$/)) || 'Προσθέστε Έγγυρη Ηλεκτρνική Διεύθυνση.'

export const isLessOrEqualThan = (val, max) => (val && val <= max) || 'Το πεδίο πρέπει να είναι μικρότερο ή ίσο από ' + max

export const isPositiveNumber = (val) => (val && val >= 0) || 'Το πεδίο πρέπει να είναι θετικός αριθμός'

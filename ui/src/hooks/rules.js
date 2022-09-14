export const isRequired = (val) => !!val || 'Απαραίτητο Πεδίο.'

export const isValidEmai = (val) => (val && val.match(/^[\w-.]+@([\w-]+\.)+[\w-]{1,4}$/)) || 'Προσθέστε Έγγυρη Ηλεκτρνική Διεύθυνση.'

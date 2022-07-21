const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
  input.addEventListener('blur', (event) => {
      valid(event.target)
  })
})

function valid(input) {
  const inputType = input.dataset.type

  if(validators[inputType]) {
    validators[inputType](input)
  }

  if(input.validity.valid) {
    input.parentElement.classList.remove('input-invalid');
    input.parentElement.querySelector('.input-message-error').style.display = "none";
    input.parentElement.querySelector('.input-message-error').innerHTML = '';
  } else {
    input.parentElement.classList.add('input-invalid');
    input.parentElement.querySelector('.input-message-error').style.display = "block";
    input.parentElement.querySelector('.input-message-error').innerHTML = showError(inputType, input);
  }
}

const validators = {
  confirmPassword:input => validateConfirmPassword(input)
}

const errorTypes = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError'
]

const errorMessages = {
  name: {
    valueMissing: 'O campo não pode estar vazio.'
  },
  email: {
    valueMissing: 'O campo não pode estar vazio.',
    typeMismatch: 'O email digitado não é válido.'
  },
  password: {
    valueMissing: 'O campo não pode estar vazio.',
    patternMismatch: 'A senha deve conter de 8 a 20 caracteres, deve conter uma letra minúscula e uma letra maiúscula.'
  },
  confirmPassword: {
    valueMissing: 'O campo não pode estar vazio.',
    customError: 'As senhas precisam ser idênticas.'
  }
}

function showError(inputType, input) {
  let message = ''
  errorTypes.forEach(error => {
    if(input.validity[error]) {
      message = errorMessages[inputType][error]
    }
  })
  return message
}
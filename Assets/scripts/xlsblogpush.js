
const scriptURL = 'https://script.google.com/macros/s/AKfycbxwinYrKxgx2FTQ8J5kgMk9C43sTCpPpTR1ulv2KrDMxhKsqe2378AnwPrXdq0wYAVv/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
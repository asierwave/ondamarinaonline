
const scriptURL = 'https://script.google.com/macros/s/AKfycbxJW8hIoLUG7GGnkTPaDhfMqX08Zwqb9IIPXJrEuvU3cdkcLqRcQrYoTzTP88IViS8gKQ/exec'
﻿
const form = document.forms['contact-form']
﻿
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
const button = document.querySelector('header button')

button.addEventListener('click', function() {
    const form = document.querySelector('.form')
    form.classList.toggle('hide')
})

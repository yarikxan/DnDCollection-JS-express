document.getElementById('cardClass').addEventListener('submit', (event) => {
    const input = document.getElementById('cardClass');
    const error = document.getElementById('classError');
    const pattern = /[A-Za-z]+/;

    if(!pattern.test(input.value)){
        event.preventDefault();
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    };
});


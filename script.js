const btnSubtmitForm = document.getElementById('form-user');

btnSubtmitForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const year = parseInt(document.getElementById('year').value, 10);
    const month = parseInt(document.getElementById('month').value, 10);
    const day = parseInt(document.getElementById('day').value, 10);
    const hour = parseInt(document.getElementById('hour').value, 10);
    const minute = parseInt(document.getElementById('minute').value, 10);
    const second = parseInt(document.getElementById('second').value, 10);

    const user = { 
        name: name,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second
    };    
    console.log(user);
    sessionStorage.setItem('user', JSON.stringify(user));
});
const btnReturn = document.getElementById('returnToIndex1');
btnReturn.addEventListener('click', () => {
    window.location.href = './index1.html';
    sessionStorage.clear();
});
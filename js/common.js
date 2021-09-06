const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', () => {
    searchInputEl.focus();
});

searchInputEl.addEventListener('focus', () => {
    // search 요소에 focus가 되면 focused라는 class를 추가 하겠다는 의미
    searchEl.classList.add('focused');
    // html의 속성을 attribute라고 한다.
    searchInputEl.setAttribute('placeholder', 'Searching Here');
});

// input 요소에서 focus가 해제되면
searchInputEl.addEventListener('blur', () => {    
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '');
});

// 현재의 년도 가져오기
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();    // 올해의 년도 반환
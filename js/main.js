// Badges 설정 => Scroll 할 때 특정 위치를 지나가면 발생하는 이벤트 설정
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// 이벤트 리스너를 그냥 사용하면 엄청남 시스템에 부하를 주기 때문에 lodash를 이용하여 
// _throttle(함수,시간)를 사용한다. 여기는 0.3초 단위로 부하를 끊어 주려는 것임.
// html 파일에 라이브러리를 cdn형태로 추가해 준다.
window.addEventListener('scroll', _.throttle(() => {
    // 스크롤의 위치를 확인할 수 있다.
    console.log(window.scrollY);

    if(window.scrollY > 500) {
        // Badge를 숨김
        //badgeEl.style.display = 'none';

        // index.html파일에 애니메이션 효과를 위해 gsap 라이브러치 추가 시킴
        // gsap.to(요소, 지속시간, 옵션)
        gsap.to(badgeEl, 0.6, {
            opacity: 0,
            display: 'none'
        })

        // to-top 버튼 보이기
        gsap.to(toTopEl, .2, {
            x: 0
        });
    } else {
        // Badge 보이기
        //badgeEl.style.display = 'block';

        gsap.to(badgeEl, 0.6, {
            opacity: 1,
            display: 'block'
        })

        //to-top 버튼 숨기기
        gsap.to(toTopEl, .2, {
            x: 100
        });
    }
}, 300));

// to-top으로 화면의 맨 위로 올리기
toTopEl.addEventListener('click', () => {
    gsap.to(window, .7, {
        scrollTo: 0
    });
});

// 이미지를 시간차를 두고 나타나게 하는 로직
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach((fadeEl, index) => {
    // gsap.to(요소, 지속시간, 옵션)
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * 0.7,
        opacity: 1
    });
});

// Swiper이용 slide animation 설정
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
});

// Notice
new Swiper('.promotion .swiper-container', {
    // direction: 'vertical',  // 이것은 기본 값
    slidesPerView: 3,   // 한번에 보여 줄 슬라이드 개수
    spaceBetween: 10,   // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데 위치
    loop: true,          // 첫번째 이미지가 마지막에도
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.promotion .swiper-pagination',    // 페이지 번호 요소 선택자
        clickable: true,        // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});

// Awards
new Swiper('.awards .swiper-container', {
    // direction: 'horizontal', // 수평 슬라이드
    // autoplay: true, // 자동 재생 여부
    // loop: true, // 반복 재생 여부
    slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
    spaceBetween: 30, // 슬라이드 사이 여백    
    // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
    navigation: { // 슬라이드 이전/다음 버튼 사용 여부
      prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
      nextEl: '.awards .swiper-next' // 다음 버튼 선택자
    }
});


// 프로모션 버튼 처리
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', () => {
    isHidePromotion = !isHidePromotion;
    if(isHidePromotion) {
        // 숨김 처리 => hide 속성 값 추가
        promotionEl.classList.add('hide');
    } else {
        // 보림 처리 => hide 속성 값 제거
        promotionEl.classList.remove('hide');
    }
});

// 유튜브 반복 애니매이션
function random(min, max) {
    //.toFixed()를 통해 반환된 문자 데이터를
    // parseFloat()를 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max-min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
    gsap.to(
        selector,           // 선택자
        random(1.5, 2.5),   // 애니매이션 동작 시간
        {
        y: size,
        repeat: -1,          // -1: 무한반복
        yoyo: true,
        ease: Power1.easeInOut, // 애니매이션 속도 조절
        delay: random(0, delay)            // 2초 뒤에 시작
    });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// 특별한 section이 보이면 애니메이션을 실행할 수 있게 해 준다.
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach((spyEl) => {    
    // Scene() : 특정 요소를 감시하는 함수
    // addTo(); 컨트롤러를 추가하기 위해
    new ScrollMagic
        .Scene({
            triggerElement: spyEl,   // 보여짐 여부를 감시할 요소를 지정
            triggerHook: .8
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});





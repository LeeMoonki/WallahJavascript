function whatsThis () {
    return this.toString();
}

var wallah = {
    what: whatsThis,
    toString: function () {
        return "[object wallah]";
    }
};

// Chrome Console 에서 실행해보자

whatsThis();                    // #1 "[object Window]"
wallah.what();                  // #2 "[object wallah]"
whatsThis.call();               // #3 "[object Window]"
whatsThis.apply(wallah);        // #4 "[object wallah]"
wallah.what.call(undefined);    // #5 "[object Window]"
wallah.what.call(wallah);       // #6 "[object wallah]"

// #1 과 같이 일반적으로 함수가 호출되면 내부적으로 call(undefined) 로 변형되고
// 첫 번째 인자가 undefined 이므로 this의 기본값으로 window가 들어가게 된다

// call()이나 apply()에서 첫 번째 인자로 설정한 객체가 this로 설정되며
// 인자가 넘어가지 않으면 window가 this로 설정된다

// #2 와 같은 경우 내부적으로 call() 함수를 호출할 때 첫 번째 인자로 멤버한수를 보유한
// 객체를 넘겨준다. 여기에서는 wallah가 this가 된다
// 하지만 다음과 같이 동일한 함수라도 멤버함수가 호출되는 방법이 다르면 this도 변경된다.

var newWallah = {
    toString: function () {
        return "[object newWallah]";
    }
}

wallah.what.call(newWallah);    // #7 "[object newWallah]"
newWallah.what = wallah.what;
newWallah.what();               // #8 "[object newWallah]"


// 이렇게 this는 함수나 스코프 기반으로 결정되는 것이 아니라 호출 방법에 따라 변경된다
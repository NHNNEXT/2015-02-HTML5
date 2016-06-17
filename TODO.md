
# 첫 번째 [링크](http://portal.nhnnext.org/streaming/2014/2%ED%95%99%EA%B8%B0/HTML5%20Programming%20-%201/%EC%A0%84%EC%9A%A9%EC%9A%B0/322)

# 새로운 학기 시작!

1. 할일에 넣고 엔터를 치면 할일이 추가된다
	- 이벤트를 할당한다.(addEventListener)
	- 할일을 추가한다.(appendChild,insertAdjacentHTML)

## 추가로 해야 할 일
template 라이브러리를 찾아보고 적용하기
- micro template
- handlebar

# 두 번째 [링크](http://portal.nhnnext.org/streaming/2014/2%ED%95%99%EA%B8%B0/HTML5%20Programming%20-%201/%EC%A0%84%EC%9A%A9%EC%9A%B0/323)
1. 등록한 할 일을 완료 처리하기
	- 이벤트 할당하기
	- class추가하기(li에 completed)
2. 삭제하기
	- 이벤트 할당하기
	- li을 서서히 사라지게 처리한 후 삭제
3. 등록하기
	- 애니메이션 기능을 추가

## 추가로 해야 할 일
- transition, transform 공부하고 적용하기
- 에니메이션이 끝난 후 삭제할 수 있도록 이벤트 확인하기
- (옵션) keyframe 공부해보기

# 세 번째 [링크](http://portal.nhnnext.org/streaming/2014/2%ED%95%99%EA%B8%B0/HTML5%20Programming%20-%201/%EC%A0%84%EC%9A%A9%EC%9A%B0/324)
1. 코드 개선하기
	- 오브젝트 형식으로
2. 서버와 연동하기
	- 추가할 때 API랑 연동하기
	- 완료할 때 API랑 연동하기
	- 삭제할 때 API랑 연동하기
	- 가져올 때 API랑 연동하기

```
// 추가/완료/삭제 응답값
{
	"fieldCount":0,
	"affectedRows":1,
	"insertId":0,
	"serverStatus":2,
	"warningCount":0,
	"message":"(Rows matched: 1 Changed: 1 Warnings: 0",
	"protocol41":true,
	"changedRows":1
}
```

```
// 가져오기 응답값
[
{"id":2,"todo":"hi","nickname":"mixed","completed":0,"date":"2014-06-25T05:38:12.000Z"},
{"id":3,"todo":"안녕","nickname":"mixed","completed":0,"date":"2014-06-25T05:38:55.000Z"}
] 
```
## 추가로 해야 할 일
- XMLHttpRequest(CORS)
- (옵션) fetch 공부해서 적용하기
- (옵션2) promise 공부하기

# 네 번째 [링크](http://portal.nhnnext.org/streaming/2014/2%ED%95%99%EA%B8%B0/HTML5%20Programming%20-%201/%EC%A0%84%EC%9A%A9%EC%9A%B0/324)
1. 온라인 / 오프라인
	- 오프라인일 때 localStorage에 저장하기
	- 온라인일 때 서버에 싱크 맞추기

## 추가로 해야 할 일
- localStorage, sessionStorage
- on/offline
- (옵션) indexedDB 공부해서 적용하기

# 다섯 번째 [링크](http://portal.nhnnext.org/streaming/2014/2%ED%95%99%EA%B8%B0/HTML5%20Programming%20-%201/%EC%A0%84%EC%9A%A9%EC%9A%B0/325)
1. 뒤로 가기.
	- pushState활용하기
2. 등록,삭제할 때 애니메이션 입히기
	- CSS3활용

## 추가로 해야 할 일
- pushState, popState
- (옵션) Service Worker 공부해서 적용하기

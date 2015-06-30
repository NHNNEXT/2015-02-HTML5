## 프로젝트 진행 방법

### 1. fork하기
(https://github.com/NHNNEXT/2015-02-HTML5/) jjung

### 2. fork한 프로젝트 클론
```
git clone https://github.com/{본인_아이디}/2015-02-HTML5
ex) git clone https://github.com/mixed/2015-02-HTML5
```

### 3. 프로젝트로 이동
```
cd 2015-02-HTML5
```

### 4. 교수 저장소 등록
```
git remote add upstream https://github.com/NHNNEXT/2015-02-HTML5
```

### 3. 본인에 아이디로 브랜치를 만들고 checkout
```
git checkout -b 본인_아이디
ex) git checkout -b mixed
```

### 4. 개발 시작
[TODO](https://github.com/NHNNEXT/2015-02-HTML5/blob/master/TODO.md)

### 5. 커밋
```
git status //확인
git rm 파일명 //삭제된 파일
git add 파일명(or * 모두) // 추가/변경 파일
git commit -m "메세지" // 커밋
```

### 5. 본인 원격 저장소에 올리기
```
git push origin 본인_아이디
ex) git push origin mixed
```

### 6. 교수한데 pull request
```
git push upstream 본인_아이디 
ex) git push upstream 본인_아이디

```
[참고](https://github.com/NHNNEXT/2015-02-HTML5/wiki/PR%EB%B3%B4%EB%82%B4%EB%8A%94-%EB%B0%A9%EB%B2%95)

### 7. 교수의 review을 확인 후 수정하고 4번 부터 시작.


### 9. 끝나면 다음 주차를 4번부터 다시 시작.


## 수업이 끝나면 알고 있어야 하는 HTML5
- transition, transform
- XMLHttpRequest2(CORS)
- localStorage, sessionStorage
- on/offline
- pushState, popState

## 옵션
- keyframe
- fetch, promise
- indexedDB
- Service Worker

# :: 원티드 프리온보딩 챌린지 프론트엔드 코스 사전과제 안내 & API

# 1-1) 사전과제 진행 가이드

- 본 레포지토리는 간단한 `Todolist CRUD 서버`를 제공한 것이기에, 과제 진행을 위해서는 별도 프론트엔드 프로젝트를 만드셔야 합니다.
  - 제출 레파지토리 명은 `wanted-pre-onboarding-challenge-fe-27`로 생성해 주세요.
- 제공해드리는 API Repository를 활용하여 가이드에 따라 `Todo App`을 작성하고 본인 Github에 업로드해주세요.
  - 완성한 과제는 본 Repository의 issue 탭에 comment로 달아 제출해주세요([공지 링크](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api/issues/25)).
  - 주의) Public이 아닐 경우 과제를 확인할 수 없습니다
- 과제는 커리큘럼 진행 간 활용되며, 해당 과제에 대한 해설은 개강 후 진행될 예정입니다.
  - 코드의 일관성, 가독성, 함수 분리, 컴포넌트 설계, 코드 퀄리티 등을 염두에 두고 과제를 진행해주세요.
- `README.md`를 꼭 작성해 주세요. 본인에 대한 소개나 프로젝트 소개 등 자유롭게 작성해주시면 됩니다.
- 반드시 `Vite`, `React Router v6`, `React 함수 컴포넌트(Hooks)` 기반으로 개발해주세요.
  - 과제 수행에 SSR이 필요하다고 판단하셨을 경우 vite와 호환되는 Remix를 선택하시면 됩니다.
  - Next.js 등의 다른 기술과 우열이 있다는 판단 보다는 커리큘럼의 효과적인 운영을 위한 제한사항입니다.

\* 문의 사항은 사전 과제 Repository의 Issue로 등록해 주세요.

# 1-2) 클라이언트 구현 과제 안내

## Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [ ] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [ ] 이메일 조건 : 최소 `@`, `.` 포함
  - [ ] 비밀번호 조건 : 8자 이상 입력
  - [ ] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [ ] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [ ] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [ ] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

## Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [ ] 목록 / 상세 영역으로 나누어 구현해주세요
  - [ ] Todo 목록을 볼 수 있습니다.
  - [ ] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [ ] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [ ] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [ ] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [ ] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [ ] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

## 과제 참고 사항

1. 로컬 서버를 실행했을 때 생성되는 `db/db.json`이 DB 역할을 하게 됩니다. 해당 파일을 삭제하면 DB는 초기화 됩니다.

2. 로그인 / 회원 가입 기능은 유저를 DB에 추가하고 JWT 토큰을 응답으로 돌려줄 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지는 않습니다. (모든 유저가 하나의 Todo를 가짐)

3. 로그아웃은 클라이언트 단에서 localStorage에 저장된 token을 삭제하는 방식으로 간단히 구현해주세요.

# 2-1) API 실행

```bash
> yarn

> yarn start # http://localhost:8080
```

# 2-2) API 스펙

## [Todos](#todos)

- [getTodos](#getTodos)
- [getTodoById](#getTodoById)
- [createTodo](#createTodo)
- [updateTodo](#updateTodo)
- [deleteTodo](#deleteTodo)

## [Auth](#auth)

- [login](#login)
- [signUp](#signUp)

# <span id="todos">2-3) Todos</span>

## getTodos

### URL

- GET `/todos`
- Headers
  - Authorization: login token

### Query Parameters

- **sort** (string, optional): 정렬 기준 (`createdAt`, `updatedAt`, `priority`)
- **order** (string, optional): 정렬 순서 (`asc` 또는 `desc`)
- **priorityFilter** (string, optional): 우선순위 필터링 (`urgent`, `normal`, `low`)
- **keyword** (string, optional): 제목 또는 내용에서 검색할 키워드
- **countOnly** (boolean, optional): `true`로 설정하면 할 일의 개수만 반환

### 응답 예시

```json
{
	"data": [
		{
			"title": "hi",
			"content": "hello",
			"id": "z3FGrcRL55qDCFnP4KRtn",
			"createdAt": "2022-07-24T14:15:55.537Z",
			"updatedAt": "2022-07-24T14:15:55.537Z",
			"priority": "urgent"
		},
		{
			"title": "hi",
			"content": "hello",
			"id": "z3FGrcRL55qDCFnP4KRtn",
			"createdAt": "2022-07-24T14:15:55.537Z",
			"updatedAt": "2022-07-24T14:15:55.537Z",
			"priority": "normal"
		}
	]
}
```

예시 사용법:

- **우선순위 필터링**: `/todos?priorityFilter=urgent`
- **키워드 검색**: `/todos?keyword=meeting`
- **정렬 및 순서 지정**: `/todos?sort=createdAt&order=desc`
- **조합된 조건**: `/todos?priorityFilter=normal&sort=updatedAt&order=asc&keyword=project`

---

## getTodoById

### URL

- GET `/todos/:id`
- Headers
  - Authorization: login token

### 응답 예시

```json
{
	"data": {
		"title": "hi",
		"content": "hello",
		"id": "z3FGrcRL55qDCFnP4KRtn",
		"createdAt": "2022-07-24T14:15:55.537Z",
		"updatedAt": "2022-07-24T14:15:55.537Z",
		"priority": "urgent"
	}
}
```

---

## createTodo

### URL

- POST `/todos`
- Parameters
  - title: string
  - content: string
  - priority: "urgent" | "normal" | "low"
- Headers
  - Authorization: login token

### 응답 예시

```json
{
	"data": {
		"title": "hi",
		"content": "hello",
		"id": "z3FGrcRL55qDCFnP4KRtn",
		"createdAt": "2022-07-24T14:15:55.537Z",
		"updatedAt": "2022-07-24T14:15:55.537Z",
		"priority": "normal"
	}
}
```

---

## updateTodo

### URL

- PUT `/todos/:id`
- Parameters
  - title: string
  - content: string
  - priority: "urgent" | "normal" | "low"
- Headers
  - Authorization: login token

### 응답 예시

```json
{
	"data": {
		"title": "제목 변경",
		"content": "내용 변경",
		"id": "RMfi3XyOKoI5zd0A_bsPL",
		"createdAt": "2022-07-24T14:25:48.627Z",
		"updatedAt": "2022-07-24T14:25:48.627Z",
		"priority": "urgent"
	}
}
```

---

## deleteTodo

### URL

- DELETE `/todos/:id`
- Headers
  - Authorization: login token

### 응답 예시

```json
{
	"data": null
}
```

---

# <span id="auth">2-4) Auth</span>

## login

### URL

- POST `/users/login`
- Parameters
  - email: string
  - password: string

### 응답 예시

```json
{
	"message": "성공적으로 로그인 했습니다",
	"token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
}
```

---

## signUp

### URL

- POST `/users/create`
- Parameters
  - email: string
  - password: string

### 응답 예시

```json
{
	"message": "계정이 성공적으로 생성되었습니다",
	"token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
}
```

```

```

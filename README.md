```sh
pnpm i
pnpm dev
```

## Tech Stack

- PNPM
- Vite
- TypeScript
- React Router DOM
- ESLint
- Prettier
- Vitest

## Assignment 1 - Login / SignUp

### 1.1 - `/auth` 경로에서 로그인/회원가입 가능

- [x] 로그인/회원가입을 별도의 경로로 분리해도 무방
- [x] 이메일/비밀번호 input 및 제출 button 필수

### 1.2 - 이메일/비밀번호의 유효성 조건

> validator

- [x] 이메일: `@` 및 `.` 포함
- [x] 비밀번호: 8자 이상
- [ ] 이메일/비밀번호 모두 입력 및 유효성 만족 시 제출 버튼 활성화

### 1.3 - 로그인 API 호출 후, 올바른 응답 수신 시 루트 경로로 이동

> `useSyncLocalStorage`

- [x] 응답받은 토큰을 로컬 스토리지에 저장
- [x] 이후 로그인 시 토큰 존재하면 루트 경로로 리다이렉트
- [ ] 어떤 경우든 토큰이 유효하지 않을 시, 사용자에게 알린 후 로그인 페이지로 리다이렉트
- [x] 로그아웃 시 로컬 스토리지에 저장된 토큰 삭제

## Assignment 2 - Todo List

### 2.1 - Todo List API를 사용하여 Todo List CRUD 구현

- [ ] 목록과 상세 영역으로 분리 (`/todos`: 목록 + 입력창, `todos/:id`: 목록 + 상세)
- [x] Todo 목록을 렌더링
- [x] 추가 버튼 클릭 시 Todo 추가
- [x] 수정 버튼 클릭 시 수정 모드 활성화
  - [x] 수정한 내용의 제출 또는 취소 가능
- [x] 삭제 버튼 클릭 시 해당 Todo 삭제

### 2.2 - Todo 목록 및 개별 Todo의 상세를 한 화면에서 확인 가능

> URL 사용 e.g. `?todo=<id>`

- [ ] 새로고침 시 현상태 유지
- [ ] 뒤로가기 시 개별 Todo의 상세를 조회한 순서의 역으로 탐색 가능

### 2.3 - 한 페이지 내에서 새로고침 없이 데이터의 정합성 보장

- [ ] Todo의 수정 사항을 목록에도 실시간 반영

## 과제 참고 사항

- 로컬 서버 실행 시 생성되는 `db/db.json`이 DB 역할. 해당 파일 삭제 시 DB는 초기화됨.
- 로그인/회원가입 기능은 유저를 DB에 추가한 뒤 JWT 토큰을 반환할 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지 않음. (즉, 모든 유저의 Todo가 동일)

## API

### Todo

#### Get Todo List

##### URL

- GET `/todos`
- Headers
  - Authorization: \<access token>

##### Query Parameters

- **sort** (string, optional): 정렬 기준 (`createdAt`, `updatedAt`, `priority`)
- **order** (string, optional): 정렬 순서 (`asc` 또는 `desc`)
- **priorityFilter** (string, optional): 우선순위 필터링 (`urgent`, `normal`, `low`)
- **keyword** (string, optional): 제목 또는 내용에서 검색할 키워드
- **countOnly** (boolean, optional): `true`로 설정하면 할 일의 개수만 반환

###### Example Usage

- **우선순위 필터링**: `/todos?priorityFilter=urgent`
- **키워드 검색**: `/todos?keyword=meeting`
- **정렬 기준 및 순서 지정**: `/todos?sort=createdAt&order=desc`
- **조건 조합**: `/todos?priorityFilter=normal&sort=updatedAt&order=asc&keyword=project`

##### 응답

###### 성공

```json
// 200
{
	"data": [
		{
			"id": "z3FGrcRL55qDCFnP4KRtn",
			"title": "hi",
			"content": "hello",
			"priority": "urgent",
			"createdAt": "2022-07-24T14:15:55.537Z",
			"updatedAt": "2022-07-24T14:15:55.537Z"
		},
		// ...
		{
			"id": "z3FGrcRL55qDCFnP4KRtn",
			"title": "hi",
			"content": "hello",
			"priority": "normal",
			"createdAt": "2022-07-24T14:15:55.537Z",
			"updatedAt": "2022-07-24T14:15:55.537Z"
		}
	]
}
```

#### Get Todo Detail

##### URL

- GET `/todos/:id`
- Headers
  - Authorization: \<access token>

##### 응답 예시

###### 성공

```json
// 200
{
	"data": {
		"id": "z3FGrcRL55qDCFnP4KRtn",
		"title": "hi",
		"content": "hello",
		"priority": "urgent",
		"createdAt": "2022-07-24T14:15:55.537Z",
		"updatedAt": "2022-07-24T14:15:55.537Z"
	}
}
```

###### 실패

```json
// 400
{
	"details":"todo를 찾는 도중 문제가 생겼습니다"
}

// 401
{
	"details": "Token is missing"
}
```

#### Create Todo

##### URL

- POST `/todos`
- Headers
  - Authorization: \<access token>
- Body
  - title: string
  - content: string
  - priority: "urgent" | "normal" | "low"

##### 응답 예시

###### 성공

```json
// 200
{
	"data": {
		"id": "z3FGrcRL55qDCFnP4KRtn",
		"title": "hi",
		"content": "hello",
		"createdAt": "2022-07-24T14:15:55.537Z",
		"updatedAt": "2022-07-24T14:15:55.537Z"
	}
}
```

###### 실패

```json
// 400
{
	"details": "input을 다시 확인해주세요"
}

// 401
{
	"details": "Token is missing"
}
```

#### Update Todo

##### URL

- PUT `/todos/:id`
- Headers
  - Authorization: \<access token>
- Body
  - title: string
  - content: string

##### 응답 예시

###### 성공

```json
// 200
{
	"data": {
		"id": "RMfi3XyOKoI5zd0A_bsPL",
		"title": "제목 변경",
		"content": "내용 변경",
		"priority": "urgent",
		"createdAt": "2022-07-24T14:25:48.627Z",
		"updatedAt": "2022-07-24T14:25:48.627Z"
	}
}
```

###### 실패

```json
// 400
{
  "details": "todo를 찾는 도중 문제가 생겼습니다"
}

// 400
{
  "details": "input을 다시 확인해주세요"
}

// 401
{
	"details": "Token is missing"
}
```

### Delete Todo

#### URL

- DELETE `/todos/:id`
- Headers
  - Authorization: \<access token>

#### 응답 예시

##### 성공

```json
// 200
{
	"data": null
}
```

##### 실패

```json
// 401
{
	"details": "Token is missing"
}
```

### Auth

#### Sign Up

##### URL

- POST `/users/create`
- Body
  - email: string
  - password: string

##### 응답 예시

###### 성공

```json
{
	"message": "계정이 성공적으로 생성되었습니다",
	"token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
}
```

###### 실패

```json
// 400
{
	"details": "이메일 / 패스워드 값이 비어있습니다"
}

// 400
{
	"details": "이메일 형식에 맞게 입력해주세요"
}

// 400
{
	"details": "패스워드 길이는 8 이상이어야 합니다"
}

// 409
{
	"details": "이미 존재하는 유저입니다"
}
```

#### Sign In

##### URL

- POST `/users/login`
- Body
  - email: string
  - password: string

##### 응답 예시

###### 성공

```json
// 200
{
	"message": "성공적으로 로그인 했습니다",
	"token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
}
```

###### 실패

```json
// 400
{
	"details": "로그인에 실패했습니다"
}
```

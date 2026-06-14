# Atoms

더 쪼갤 수 없는 완성 단위입니다. 아래 예시의 prop을 직접 만져보려면 [Playground](/playground)에서 살펴보세요.

## Button

단일 액션에 쓰는 버튼입니다. hover하거나 누르면 그림자 속으로 눌립니다. 아래처럼 variant와 size를 지정합니다.

```tsx
<Button variant="primary" size="md">Press me</Button>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `variant` | `primary` `secondary` `success` `warning` `danger` `info` `neutral` `ink` | `neutral` |
| `size` | `sm` `md` `lg` | `md` |
| `leadingIcon` `trailingIcon` | `ReactNode` | — |

## Input

테두리 필드입니다. 포커스하면 그림자 속으로 눌립니다. leading·trailing 슬롯에 아이콘을 넣을 수 있습니다.

```tsx
<Input fullWidth placeholder="Search students…" leading={<Icon>🔍</Icon>} />
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `leading` `trailing` | `ReactNode` | — |
| `fullWidth` | `boolean` | `false` |

검색 입력이 필요하면 검색 아이콘이 이미 붙어 있는 `SearchInput`을 씁니다.

## Checkbox

테두리 박스에 네온 체크가 들어가는 체크박스입니다. 그림자 없이 평평하고, 호버하면 옅은 틴트가 깔리고 checked되면 네온으로 채워집니다. `<label>`로 감싸므로 `label` prop만 넘기면 클릭 영역까지 묶입니다.

```tsx
<Checkbox label="동의합니다" defaultChecked />
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `label` | `ReactNode` | — |
| 그 외 | `input[type=checkbox]`의 모든 prop (`type`·`size` 제외) | — |

## Radio

체크박스와 같은 결의 라디오입니다. 단, brutalist답게 둥근 점이 아니라 네모난 칸이 selected되면 네온으로 채워집니다. 그림자 없이 평평하고 호버 시 옅은 틴트가 깔립니다.

```tsx
<Radio name="plan" label="Pro" value="pro" defaultChecked />
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `label` | `ReactNode` | — |
| 그 외 | `input[type=radio]`의 모든 prop (`type`·`size` 제외) | — |

## Switch

흑백을 반전시키는 슬라이딩 토글입니다. OFF는 흰 트랙 + 검정 thumb, ON은 검정 트랙 + 흰 thumb으로 뒤집힙니다. 내부 checkbox input은 시각적으로 숨겨집니다. `Toggle`이라는 이름으로도 export됩니다.

```tsx
<Switch label="알림 받기" defaultChecked />
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `label` | `ReactNode` | — |
| 그 외 | `input[type=checkbox]`의 모든 prop (`type`·`size` 제외) | — |

`Toggle`은 `Switch`의 alias라 prop이 동일합니다.

## Tag · Badge

`Tag`는 작은 라벨 칩이고, `Badge`는 카운트나 상태를 보여주는 핀입니다.

```tsx
<Tag color="cyan">neon</Tag>
<Badge color="pink">12</Badge>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `color` | `neutral` + 네온 7색 | Tag `neutral` · Badge `pink` |

## Table

데이터 테이블입니다. `<Table>`이 스스로를 `.funky-table__scroll` 컨테이너로 감싸 가로 스크롤을 처리하니, 안에는 plain `<thead>`·`<tbody>`·`<tr>`·`<th>`·`<td>`만 넣으면 `.funky-table` 클래스가 스타일링합니다. 검정 헤더 + 크림 본문 + 2px 검정 행 구분선 + sm 그림자를 입습니다.

```tsx
<Table>
  <thead>
    <tr><th>이름</th><th>점수</th></tr>
  </thead>
  <tbody>
    <tr><td>재원</td><td>98</td></tr>
  </tbody>
</Table>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `children` | `ReactNode` (plain `<thead>/<tbody>/…`) | — |
| 그 외 | `<table>`의 모든 prop | — |

## Text

타이포를 담당하는 atom입니다. `font.role`에 1:1 매핑되는 8개 register를 제공합니다 — 구조(loud)는 `display`·`heading`·`title`·`chrome`·`overline`, 내용(quiet)은 `body`·`caption`, 코드는 mono인 `code`.

```tsx
<Text variant="display">DISPLAY</Text>
<Text variant="heading">Loud heading</Text>
<Text variant="title">Section title</Text>
<Text variant="body" muted>설명 본문</Text>
<Text variant="caption">보조 설명</Text>
<Text variant="chrome">EYEBROW LABEL</Text>
<Text variant="overline">OVERLINE</Text>
<Text variant="code">const x = 1</Text>
```

| variant | 성격 | 기본 태그 |
| --- | --- | --- |
| `display` | 가장 큰 black·tight | `h1` |
| `heading` | black·tight | `h2` |
| `title` | bold·snug | `h3` |
| `body` | medium 본문 (기본) | `p` |
| `caption` | medium 작은 본문 | `p` |
| `chrome` | UPPERCASE·black·자간 | `span` |
| `overline` | UPPERCASE·black·넓은 자간 | `span` |
| `code` | mono | `code` |

| prop | 값 | 기본 |
| --- | --- | --- |
| `variant` | 위 8종 | `body` |
| `as` | `ElementType` | variant별 기본 태그 |
| `muted` | `boolean` (옅은 잉크색) | `false` |

## Icon

아이콘을 감싸는 정사각 슬롯입니다. 시스템은 아이콘 세트를 싣지 않으니 lucide·svg·emoji를 직접 넣습니다.

```tsx
<Icon size={24}><LucideSearch /></Icon>
```

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

## Tag · Badge

`Tag`는 작은 라벨 칩이고, `Badge`는 카운트나 상태를 보여주는 핀입니다.

```tsx
<Tag color="cyan">neon</Tag>
<Badge color="pink">12</Badge>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `color` | `neutral` + 네온 7색 | Tag `neutral` · Badge `pink` |

## Text

타이포를 담당하는 atom입니다. heading·body·chrome 세 가지 register를 제공합니다.

```tsx
<Text variant="heading">Loud heading</Text>
<Text variant="body" muted>설명 본문</Text>
<Text variant="chrome">EYEBROW LABEL</Text>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `variant` | `heading` `body` `chrome` | `body` |
| `as` | `ElementType` | variant별 기본 태그 |
| `muted` | `boolean` | `false` |

## Icon

아이콘을 감싸는 정사각 슬롯입니다. 시스템은 아이콘 세트를 싣지 않으니 lucide·svg·emoji를 직접 넣습니다.

```tsx
<Icon size={24}><LucideSearch /></Icon>
```

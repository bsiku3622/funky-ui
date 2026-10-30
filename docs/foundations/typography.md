# Typography

funky-ui의 글자 역할과 그 숫자를 정리한 문서입니다. 숫자의 정본은 `tokens/typography.ts`이고, 컴포넌트는 역할 이름이나 컨트롤 크기로만 고릅니다.

## 서체

Pretendard Variable 하나를 씁니다. 굵기 사다리(400 · 500 · 700 · 900)가 이 서체를 전제하므로, 앱은 `<head>`에서 서체 스타일시트를 먼저 불러옵니다. 주소의 정본은 `FONT_STYLESHEET`입니다. 코드 · 식별자 같은 기술적 자리에만 `family="mono"`를 씁니다.

한글은 어절 사이에서만 줄을 바꿉니다(`word-break: keep-all`). 문서 바탕(`body`)이 body 역할 전체를 받으므로 `Text` 밖의 글자도 같은 글자로 그려집니다.

## 글자 역할

class-explorer를 계측해 보니 본문조차 700, 구조 라벨은 900이었습니다. funky의 글자는 두껍습니다. 역할은 크기 사다리 아홉에, 가장 많이 반복된 구조 라벨 둘을 더한 열한 개입니다.

| 역할 | 크기/줄 | 굵기 | 자간 | 대문자 | 쓰는 곳 |
| --- | --- | --- | --- | --- | --- |
| `hero` | 36/40 → md↑ 60/60 | 900 | -0.05em | ○ | 랜딩 · 검색 프로필의 큰 제목 — 유일하게 폭에 따라 변함 |
| `display` | 36/40 | 900 | -0.05em | ○ | 페이지의 큰 제목 |
| `title` | 24/32 | 900 | -0.025em | | 카드 · 페이지 머리 제목 |
| `heading` | 20/28 | 900 | -0.025em | | 섹션 제목 · 접히는 카드 머리 |
| `subheading` | 16/24 | 900 | 0 | | 작은 제목 |
| `body` | 14/20 | 700 | 0 | | 본문 |
| `caption` | 12/16 | 700 | 0 | | 보조 정보 |
| `label` | 11/16 | 900 | 0 | | 짧은 이름 · 수치 |
| `micro` | 10/14 | 900 | 0 | | 칸 안의 아주 작은 글자 |
| `overline` | 10/14 | 900 | 0.1em | ○ | 카드 머리의 작은 이름표 — 약한 잉크 (계측 35회) |
| `subtitle` | 14/20 | 900 | 0.1em | ○ | 섹션 소제목 — 약한 잉크 (`RetroSubTitle`, 41회) |

`hero`만 폭에 따라 커집니다. 좁은 화면에서는 36px · 줄 높이 40으로 `display`와 같고, `md`(768px) 이상에서 60px · 줄 높이 60이 됩니다. `md` 이상의 값은 역할의 `md` 칸(`TEXT_ROLES.hero.md`)에 따로 적혀 있고, 폭에 따라 크기를 바꾸는 것은 미디어 쿼리 하나입니다.

줄 높이는 px 고정값이라 한 줄짜리 라벨과 표에서 칸이 흔들리지 않습니다. 여러 줄을 읽는 안내 문단은 그 값이 빽빽하므로 `leading="relaxed"`(글자 크기의 1.625배, class-explorer의 `leading-relaxed`)를 줍니다. `weight`와 `tone`은 역할과 따로 고르는 축이라, `overline`의 기본 잉크나 `body`의 기본 굵기를 바꿀 때만 줍니다. 아래는 이름표, 굵기를 바꾼 본문, 여러 줄 문단, 색 글자입니다.

```tsx
<Text variant="overline">Enrolled Classes</Text>
<Text variant="body" weight="black">일반물리학</Text>
<Text as="p" variant="caption" leading="relaxed">심화필수 트랙은 3학년 2학기까지 바꿀 수 있습니다.</Text>
<Text tone="red" weight="black">저장하지 못했습니다</Text>
```

`tone`의 색 이름(`pink` `purple` `cyan` `yellow` `orange` `sky` `green` `red`)은 그 색의 진한 글자(`solidInk`)입니다. 네온 원색은 흰 면 위에서 AA에 못 미치므로 사다리의 글자 칸으로 모읍니다. 어두운 면 위의 흐린 글자는 `inverseMuted`(흰 60%)입니다.

섹션 소제목과 페이지 제목은 영어로 씁니다(`Today` · `Timetable` · `Meal`). 한 줄에 나란히 선 두 칸의 제목 언어가 다르면 그것만으로 어수선해집니다. 본문 · 버튼 · 안내 문구는 한국어 그대로입니다.

## 컨트롤 글자

Button · Badge · NavButton의 글자는 컨트롤 크기마다 하나이고, 전부 900 대문자입니다. 작을수록 자간을 넓혀 10px에서도 낱자가 붙지 않게 했습니다.

| 크기 | 글자 | 자간 |
| --- | --- | --- |
| `xs` | 10px | 0.08em |
| `sm` | 12px | 0.05em |
| `md` | 14px | 0.02em |
| `lg` | 16px | 0.02em |

입력 칸의 값은 읽는 내용이라 900 대문자가 아니라 700입니다(xs 12 · sm 13 · md 14 · lg 16).

## 로고 글자

`Wordmark`는 기울어진(−6°) 900 대문자입니다. 크기는 역할 사다리와 같은 숫자를 씁니다 — `sm` 20px(작은 머리띠) · `md` 24px(상단 바) · `lg` 36px(로그인 화면의 제목). class-explorer의 30px 로고는 `lg`로 모읍니다.

## 큰 숫자

`Stat`의 숫자(36 · 48px, -0.05em)는 역할 사다리 밖의 유일한 예외입니다. 숫자는 `tabular-nums`로 자리만 맞추고 서체는 바꾸지 않습니다.

## 앱 stylesheet에서

컴포넌트가 아닌 자리에서 같은 글자를 쓰려면 `/tokens`의 `textRule`로 선언을 가져옵니다.

```ts
import { TEXT_ROLES, textRule } from "@studio-baeks/funky-ui/tokens";

const kicker = style(textRule(TEXT_ROLES.overline));
```

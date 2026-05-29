# 토큰

색·그림자·타입·간격 같은 모든 값은 `src/tokens.ts` 한 곳에서 정의합니다. 이 파일이 정본(SSOT)이고, CSS 변수 시트인 `src/tokens.css`는 여기서 codegen됩니다.

> 토큰을 바꾸면 `npm run gen:tokens`로 `tokens.css`를 다시 생성하세요. `tokens.css`는 직접 수정하지 않습니다.

## 색

크림 surface와 검정 ink, 그리고 7개의 네온 accent로 이뤄집니다.

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `bg` | `#fff5d1` | 페이지 바탕 (크림) |
| `surface` | `#ffffff` | 카드 등 떠 있는 면 |
| `sunken` | `#fff0b8` | 눌려 들어간 면 |
| `ink` | `#222222` | 본문 글자 |
| `pink` `cyan` `yellow` | 네온 | accent · 면색 |
| `purple` `orange` `sky` `green` | 네온 | accent · 면색 |

의미를 드러내려면 `role` 별칭(`primary`=pink, `secondary`=purple …)으로 참조하는 편을 권합니다.

## 그림자

blur가 0인 하드 오프셋 솔리드입니다. 시스템의 시그니처입니다.

| 토큰 | 값 |
| --- | --- |
| `shadow.sm` | `4px 4px 0 0 rgba(0,0,0,.2)` |
| `shadow.md` | `6px 6px 0 0 rgba(0,0,0,.2)` |
| `shadow.lg` | `8px 8px 0 0 rgba(0,0,0,.2)` |

## 타입

Pretendard에 weight 500·700·900, base 16px의 rem ladder를 씁니다. vff/original의 Tailwind 스케일을 그대로 따릅니다.

| 토큰 | 값 | | 토큰 | 값 |
| --- | --- | --- | --- | --- |
| `2xs` | 0.625rem | | `xl` | 1.25rem |
| `xs` | 0.75rem | | `2xl` | 1.5rem |
| `sm` | 0.875rem | | `3xl` | 1.875rem |
| `md` | 1rem | | `4xl` | 2.25rem |
| `lg` | 1.125rem | | | |

chrome 텍스트는 uppercase에 0.05em 자간, weight 900이 기본 정체성입니다.

## 간격

컴포넌트 안쪽의 padding과 gap에 쓰는 스케일입니다.

| 토큰 | 값 |
| --- | --- |
| `xs` | 0.375rem |
| `sm` | 0.5rem |
| `md` | 0.75rem |
| `lg` | 1rem |
| `xl` | 1.5rem |
| `2xl` | 2rem |

## Shape · Motion

radius는 `0` 하나뿐이라 pill조차 각이 살아 있습니다. border는 2px(`border`)와 3px(`border-bold`) 두 단계이고, 색은 항상 검정입니다. motion은 duration `100ms`, easing `ease-out`, press-offset `4px`로 고정돼 있습니다.

## TS에서 직접 쓰기

값을 코드에서 바로 다뤄야 하면 토큰 객체를 import합니다.

```tsx
import { tokens, color, shadow } from "@studio-baeks/funky-ui";

const fill = color.cyan; // "#3decfd"
const lift = shadow.md;  // "6px 6px 0 0 rgba(0,0,0,.2)"
```

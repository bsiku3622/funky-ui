# Components

Atom을 합성하거나 약간의 상태를 갖는 "껍데기"입니다. 라이브 예시는 [Playground](/playground)에 있습니다.

## Card

검정 테두리와 하드 그림자로 액자만 잡아 주는 껍데기입니다. 안을 무엇으로 채울지는 쓰는 쪽이 정합니다. `padded`를 끄면 안쪽 여백 없이 자식이 테두리에 딱 붙습니다.

```tsx
<Card>아무 내용</Card>
<Card padded={false}><StatTile … /></Card>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `padded` | `boolean` | `true` |

## StatTile

네온 면 위에 큰 검정 숫자를 얹는 완성형 통계 단위입니다.

```tsx
<StatTile color="cyan" label="Active students" value="357" hint="+12 this week" />
```

| prop | 값 |
| --- | --- |
| `label` `value` | `ReactNode` (필수) |
| `hint` | `ReactNode` |
| `color` | 네온 7색 (기본 `cyan`) |

## Accordion

`Accordion / .Item / .Header / .Panel`로 짜는 compound 컴포넌트입니다. `Accordion.Item`에 `defaultOpen`을 주면 처음부터 열린 채 시작합니다.

```tsx
<Accordion>
  <Accordion.Item defaultOpen>
    <Accordion.Header>Section one</Accordion.Header>
    <Accordion.Panel>First panel.</Accordion.Panel>
  </Accordion.Item>
</Accordion>
```

## Tabs

`Tabs / .List / .Trigger / .Panel`로 짜며 제어·비제어를 모두 지원합니다. 비제어로 쓸 때는 `defaultValue`만 주고, 직접 제어할 때는 `value`와 `onValueChange`를 함께 넘깁니다.

```tsx
<Tabs defaultValue="a">
  <Tabs.List>
    <Tabs.Trigger value="a">Overview</Tabs.Trigger>
    <Tabs.Trigger value="b">Detail</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="a">Overview panel.</Tabs.Panel>
  <Tabs.Panel value="b">Detail panel.</Tabs.Panel>
</Tabs>
```

## Modal

`open`으로 열고 Esc나 배경 클릭으로 닫는 오버레이입니다. 열림 상태는 쓰는 쪽이 들고 있습니다.

```tsx
const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)}>
  <Modal.Header onClose={() => setOpen(false)}>Title</Modal.Header>
  <Modal.Body>본문</Modal.Body>
  <Modal.Footer>
    <Button variant="white" onClick={() => setOpen(false)}>Close</Button>
  </Modal.Footer>
</Modal>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `open` | `boolean` (필수) | — |
| `onClose` | `() => void` (필수) | — |
| `closeOnOverlay` | `boolean` | `true` |

## Panel

화면을 영역으로 나누는 **구조 프리미티브**입니다. 3px 검정 테두리 + 하드 그림자에 선택적 uppercase 헤더바를 얹습니다. funky-ui는 영역을 1px 얇은 선이 아니라 Panel로 끊습니다([Composition §2](https://funky-ui.bsiku.dev/docs/api/foundations/composition.md) 참고). 헤더는 기본 검정(`ink`) 면이고, `color`로 네온을 주면 더 과감해집니다. `actions`로 헤더 우측에 버튼·태그를 붙입니다.

```tsx
<Panel title="Filters" color="pink" actions={<Button size="sm">Reset</Button>}>
  본문
</Panel>
<Panel title="Raw" padded={false}><pre>…</pre></Panel>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `title` | `ReactNode` (없으면 헤더바 생략) | — |
| `actions` | `ReactNode` (헤더 우측) | — |
| `color` | `ink` · `neutral` · 네온 7색 | `ink` |
| `padded` | `boolean` | `true` |

## Window

신호등 dots 타이틀바가 달린 macOS풍 프레임입니다. 3px 테두리 + lg 하드 그림자. 코드 샘플·미리보기·export 샷을 감싸는 시그니처 래퍼입니다. 코드처럼 자식이 테두리에 붙어야 하면 `padded={false}`.

```tsx
<Window title="App.tsx">
  <pre>…</pre>
</Window>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `title` | `ReactNode` (없으면 dots만) | — |
| `padded` | `boolean` | `true` |

## Toolbar

도구 화면 상단의 가로 컨트롤 바입니다. 크림 면 + 3px 검정 아래 테두리. `ToolShell`의 `toolbar` 슬롯에 넣거나 단독으로 씁니다. 컨트롤은 `Toolbar.Group`으로 묶고, `Toolbar.Spacer`로 한 묶음을 우측 끝으로 밀어냅니다.

```tsx
<Toolbar>
  <Toolbar.Group>
    <Button size="sm">Open</Button>
    <Button size="sm">Save</Button>
  </Toolbar.Group>
  <Toolbar.Spacer />
  <Toolbar.Group><Button size="sm" variant="primary">Export</Button></Toolbar.Group>
</Toolbar>
```

`Toolbar`는 컨테이너(`children`)만 받습니다. `Toolbar.Group`도 `children`만, `Toolbar.Spacer`는 prop이 없습니다.

## Toast

검정 면 + 크림 글자(또는 네온 면)의 알림 박스입니다. **표시 자체만** 담당합니다 — 보임/숨김과 타이머는 쓰는 쪽이 관리합니다. `fixed`를 주면 화면 하단 중앙에 고정됩니다.

```tsx
{show && <Toast fixed>Saved ✓</Toast>}
<Toast color="green">Done</Toast>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `color` | `ink` · 네온 7색 | `ink` |
| `fixed` | `boolean` (하단 중앙 고정) | `false` |

## Select

트리거 + 하드 그림자 팝업 메뉴로 짜는 커스텀 드롭다운입니다. 외부 클릭이나 Esc로 닫히고, ↑↓로 항목을 옮기고 Enter로 고릅니다. 열림 상태는 컴포넌트가 직접 들고, 값만 `value`/`onChange`로 제어합니다. 각 항목은 `SelectOption`(`value` · `label` · `disabled?`)으로 넘깁니다.

```tsx
const [value, setValue] = useState("a");

<Select
  value={value}
  onChange={setValue}
  options={[
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
    { value: "c", label: "Option C", disabled: true },
  ]}
  placeholder="Select…"
/>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `options` | `SelectOption[]` (필수) | — |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `placeholder` | `ReactNode` | `"Select…"` |
| `disabled` | `boolean` | `false` |

## Toc

읽기 화면 옆에 세우는 "On this page" 목차 레일입니다. 마크다운 의존성 없는 순수 react라, 항목은 `@studio-baeks/funky-ui/markdown`의 `extractToc`로 뽑아 넘깁니다. 레일을 어디에 둘지는 쓰는 쪽이 정합니다 — 이 컴포넌트는 목록만 그립니다. 항목은 `TocItem`(`id` · `text` · `depth` 2/3/4)이고, `activeId`로 현재 위치를 표시합니다.

```tsx
<Toc
  items={[
    { id: "intro", text: "Intro", depth: 2 },
    { id: "usage", text: "Usage", depth: 2 },
    { id: "props", text: "Props", depth: 3 },
  ]}
  activeId={activeId}
  onSelect={(id) => scrollTo(id)}
/>
```

| prop | 값 | 기본 |
| --- | --- | --- |
| `items` | `TocItem[]` (필수, 비면 렌더 생략) | — |
| `activeId` | `string \| null` | — |
| `onSelect` | `(id: string) => void` | — |
| `label` | `ReactNode` (헤더 라벨) | `"On this page"` |

## MarkdownView

heading 스케일 · 검정 코드블록 · `.funky-table` 표 · 선택적 KaTeX를 입힌 마크다운 렌더러입니다. 인용구는 좌측 검정 바 + accent-soft 면, 코드블록은 검정 면입니다. 무거운 deps(`react-markdown`/`katex`)를 메인 번들에서 떼어내려고 **서브패스로 분리**되어 있으니, import 경로와 CSS에 주의합니다.

```tsx
import { MarkdownView } from "@studio-baeks/funky-ui/markdown";
import "@studio-baeks/funky-ui/markdown.css"; // KaTeX 스타일 포함

<MarkdownView
  content={md}
  math
  onLinkClick={(href) => navigate(href)}
  resolveHref={(href) => href.replace(/\.md$/, "")}
/>
```

라우터에 묶이지 않습니다 — 내부 링크 이동은 `onLinkClick`로 가로채고(modifier-click·외부·앵커 링크는 통과), 상대 경로 변환은 `resolveHref`로 처리합니다. LaTeX는 `math` prop으로 켭니다.

| prop | 값 | 기본 |
| --- | --- | --- |
| `content` | `string` (필수) | — |
| `math` | `boolean` (remark-math + KaTeX) | `false` |
| `onLinkClick` | `(href, e) => void` (내부 링크 가로채기) | — |
| `resolveHref` | `(href: string) => string` | — |
| `components` | `Partial<Components>` (엘리먼트 매핑 override) | — |

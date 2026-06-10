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
    <Button variant="neutral" onClick={() => setOpen(false)}>Close</Button>
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

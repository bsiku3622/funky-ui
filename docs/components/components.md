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

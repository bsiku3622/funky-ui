# funky-ui

funky-ui는 class-explorer를 위한 neo-brutalist React 디자인 시스템입니다. 크림 바탕 위 네온, 2px 검정 선, blur 없는 하드 그림자, 그리고 누르면 그림자 속으로 가라앉는 몸짓이 정체성입니다.

시스템은 한 방향으로 쌓입니다. 각 층은 자기보다 앞의 층만 씁니다.

```
Foundations (Color · Typography → Shape → Layout → Motion)
  → Primitives → Atoms → Molecules → Components
```

Atoms와 Molecules까지는 어떤 앱에도 쓸 수 있는 범용 층이고, Components는 class-explorer 전용입니다 — 앱 셸, 학번 배지, 시간표 칸처럼 그 앱에만 있는 모양을 여기 둡니다.

| 층 | 문서 | 하는 일 |
| --- | --- | --- |
| Foundations | [foundations](foundations/README.md) | 숫자와 hex가 사는 다섯 시스템 |
| Primitives | [primitives](primitives/README.md) | 1차 바탕(Box · Text · Icon · 접근성)과, Box 위에 능력 하나를 얹은 2차(칠 — Surface · Paint, 몸짓 — Pressable, 배치) |
| Atoms | [atoms](atoms/README.md) | 한 가지 일을 하는 컨트롤 — accent × variant 축이 여기서 시작합니다 |
| Molecules | [molecules](molecules/README.md) | atom을 묶은 범용 조합 |
| Components | [components](components/README.md) | class-explorer 전용 조합 |

처음이라면 [설치](get-started/install.md)와 [원칙](get-started/principles.md)부터 읽어 주세요. class-explorer를 옮기는 중이라면 [전수조사와 분류](class-explorer/inventory.md)와 [이관표](class-explorer/migration.md)가 출발점입니다.

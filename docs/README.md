# funky-ui

funky-ui 는 Studio Baeks 의 React 디자인 시스템입니다. 크림 바탕 위에 네온 면색을 얹고, 두꺼운 검정 테두리와 하드 그림자로 화면을 단단하게 잡은 다음, 누르면 그림자 속으로 가라앉는 인터랙션으로 손맛을 더합니다.

당분간은 Studio Baeks 가 한국과학영재학교(KSA)를 위해 만드는 모든 앱의 공통 디자인 언어를 담고 있습니다. 시작은 Class Explorer 앱의 시각 언어를 토큰과 컴포넌트로 옮긴 것이었고, 지금은 그 위에 atom 부터 template 까지 쌓아 올리고 있습니다.

세 가지를 약속합니다. 구조는 과감하게·내용은 차분하게(structure loud, content quiet), 손끝에 만져지는 두 거동(눌림과 떠오름 · press & lift), 그리고 일부러 적게 둔 선택지(fewer choices). 이 약속들이 어떻게 코드로 이어지는지는 [원칙](get-started/principles.md) 에서 자세히 다룹니다.

설치하고 바로 화면에 올려보려면 컴포넌트 하나와 스타일시트만 가져오면 됩니다.

```tsx
import { Button, StatTile } from "@studio-baeks/funky-ui";
import "@studio-baeks/funky-ui/styles.css";

export const App = () => (
  <>
    <StatTile color="cyan" label="Active students" value="357" />
    <Button variant="primary">Press me</Button>
  </>
);
```

다음 문서들로 이어집니다.

- [설치](get-started/install.md) — 패키지 추가와 스타일 import
- [원칙](get-started/principles.md) — 시스템이 지키는 세 가지 약속
- [정체성](foundations/identity.md) — 왜 이렇게 그리는가 (DNA · stance · 4분면)
- [아키텍처](foundations/architecture.md) — Token → Atom → Component → Template
- [토큰](foundations/tokens.md) — 색·accent·타입·크기의 정본
- [Composition](foundations/composition.md) — 화면을 짜는 문법
- [Atoms](components/atoms.md) · [Components](components/components.md) · [Templates](components/templates.md) — 컴포넌트 레퍼런스

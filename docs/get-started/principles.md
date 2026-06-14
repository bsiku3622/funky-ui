# 원칙

funky-ui는 세 가지 확신 위에 서 있습니다. 컴포넌트를 새로 넣거나 API를 정할 때 늘 이 셋으로 판단합니다.

## 01 · 구조는 loud, 내용은 quiet

네온 면색, 하드 그림자, UPPERCASE black은 화면의 *구조*(헤더·상태·지표·네비·활성)에 몰아줍니다. 읽는 *내용*(본문·데이터·입력값)은 크림/흰 위 검정 타이포로 물러납니다. "loud by default"는 "다 시끄럽게"가 아니라 "**구조가** 시끄럽게"라는 뜻입니다. 절제가 필요한 구조 요소는 `white` variant처럼 명시적으로 고릅니다. (정체성 근거는 [identity](../foundations/identity.md)·[composition](../foundations/composition.md).)

## 02 · 눌림과 떠오름 (press & lift)

하드 그림자를 이용한 정반대의 두 거동이 시그니처입니다. **눌림**: 요소가 그림자 위에 떠 있다가 hover하면 절반, active하면 완전히 그림자 *속으로* 가라앉습니다(Button·trigger). **떠오름**: 납작하던 요소가 focus 시 그림자를 *솟아올립니다*(Input). 클릭이 손끝에 만져지는 이 촉각이 이름(funky ← thunk, 눌리는 소리)의 유래이기도 합니다.

눌림은 `.funky-pressable`, 떠오름은 `.funky-liftable` 클래스로 공유합니다 — 커스텀 transform으로 재구현하지 않습니다.

## 03 · Fewer choices

옵션을 일부러 적게 둡니다. Button은 variant 9개와 size 3개, 그게 전부입니다. 고를 게 줄면 서로 다른 사람이 만든 앱들이 저절로 닮아갑니다. 그래서 모든 API 결정은 "이 prop이 개발자의 선택지를 늘리는가?"를 먼저 묻습니다.

## 토큰만 씁니다

색·크기·시간·그림자는 `tokens.ts` 한 곳에만 정의합니다. raw hex나 inline 수치를 컴포넌트에 직접 박지 않습니다. 모든 값은 토큰을 거치거나, 거기서 codegen된 `--funky-*` 변수를 거칩니다. 자세한 내용은 [토큰](../foundations/tokens.md)에서 이어집니다.

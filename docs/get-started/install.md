# 설치

funky-ui를 React 앱에 붙이는 방법입니다. 패키지는 vanilla-extract로 스타일을 쓰고, 소비 앱에는 **소스째 vendor** 하는 것을 기본으로 합니다 — paper-ui를 쓰는 앱들과 같은 방식이고, 배포 빌드가 앱 저장소 안에서 끝납니다.

## 요구 사항

- React 19 (`ref`를 일반 prop으로 받습니다)
- Vite + `@vanilla-extract/vite-plugin`
- 서체 Pretendard Variable

## 붙이기

1. `workspace/packages/funky-ui/src`를 앱의 `vendor/funky-ui/src`로 복사하고, 같은 폴더에 `package.json`을 둡니다.

   ```json
   {
     "name": "@studio-baeks/funky-ui",
     "private": true,
     "type": "module",
     "exports": {
       ".": "./src/index.ts",
       "./tokens": "./src/tokens/public.ts",
       "./styles.css": "./src/styles/global.css.ts"
     },
     "sideEffects": ["**/*.css.ts"]
   }
   ```

2. 앱 `package.json`에 의존성을 더합니다.

   ```json
   {
     "dependencies": { "@studio-baeks/funky-ui": "file:./vendor/funky-ui", "@vanilla-extract/css": "^1.16.0" },
     "devDependencies": { "@vanilla-extract/vite-plugin": "^5.2.2" }
   }
   ```

3. Vite 설정에 플러그인을 더합니다.

   ```ts
   import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

   export default defineConfig({ plugins: [react(), vanillaExtractPlugin()] });
   ```

4. 앱 진입점에서 전역 스타일시트를 한 번 불러옵니다.

   ```ts
   import "@studio-baeks/funky-ui/styles.css";
   ```

5. `index.html`의 `<head>`에 서체를 불러옵니다. 주소의 정본은 `/tokens`의 `FONT_STYLESHEET`입니다.

   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
   ```

## Tailwind와 함께 쓸 때

패키지 CSS는 전부 cascade layer `fk` 안에 듭니다. Tailwind v4도 자기 레이어(`theme · base · components · utilities`)를 선언하는데, 레이어의 순서는 **처음 선언된 순서**로 정해집니다. funky의 CSS가 Tailwind 뒤에 로드되면 `fk`가 `utilities`보다 뒤에 서서, 컴포넌트에 준 `className="mt-4"`가 지게 됩니다.

그래서 앱 CSS 맨 위에서 순서를 먼저 못 박고, 앱 진입점에서 이 CSS를 funky의 스타일시트보다 먼저 불러옵니다.

```css
@layer theme, base, fk, components, utilities;
@import "tailwindcss";
```

이렇게 두면 Tailwind 유틸리티가 항상 funky를 이기고, 레이어 밖에 쓴 앱 CSS는 둘 다 이깁니다.

⚠️ `fk`를 `base` 앞에 두면 안 됩니다. Tailwind의 preflight가 `base`에 있어서, `* { padding: 0; border: 0 solid }`이 funky의 여백과 테두리를 전부 지웁니다.

## 이 저장소에서

Playground · 문서 사이트는 패키지를 dist가 아니라 소스로 읽습니다(`funky-ui-source` export 조건). 토큰을 고치면 곧바로 화면에 반영됩니다.

```bash
cd workspace
pnpm install
pnpm dev          # http://localhost:5190 — Playground · Docs
pnpm typecheck
pnpm build        # 패키지 dist(JS · CSS · 타입) → 사이트
```

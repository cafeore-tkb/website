# アーカイブ

過去に使っていたが、現在はどのページからも参照していないアセットを置く場所です。
**消さずに残しておくためのディレクトリ**なので、未使用だからといって削除しないでください。

## hero-message.svg

「一口に伝統と誇りをこめて。」のロゴタイプ。前年のテーマのため、
2026-09-03 にトップページのヒーロー（`src/components/Hero.astro`）から表示を外しました。

再び使う場合は、以下のようにインポートし直せば戻せます（当時は
`#hero-message` の CSS と、ロード後に `.active` を付けてフェードインさせる
`<script>` がセットになっていました。詳細は Hero.astro の変更前の履歴を参照）。

```astro
import HeroMessage from "../assets/archive/hero-message.svg";
```

# rectaris.github.io

学園アイドルマスター関連ツールへの入口となる公開ポータルです。

現在は次の公開ツールへの導線を提供しています。

- `gakumasu-timeline`: 学マスのコミュや出来事を時間軸で確認できる年表アプリ
- `supportcard-status`: サポートカード編成のステータス上昇値を試算する計算ツール

## エージェントワークフロー

このリポジトリは `project-agent-workflow` から初期化されています。

- 最初に `AGENTS.md` を確認します。
- タスクごとの参照先は `docs/agent/spec-index.yaml` で選びます。
- 重要な作業は `docs/plan/plan.md` または `docs/plan/active/` で追跡します。
- プロジェクト固有のルールは `AGENTS.md`、`docs/agent/SPEC_*.md`、既存の domain docs に置きます。

## 外部サービス連携

MCP、Linear、graph memory は任意機能です。現在の有効化状態と設定手順は `docs/agent/SPEC_EXTERNAL_SERVICES.md` を確認してください。

- 連携しない場合も、ローカルの plan、validation、Git workflow はそのまま使えます。
- 認証情報はリポジトリに置かず、環境変数または secret store で管理します。
- 外部への書き込みは、明示された lifecycle command またはユーザー指示がある場合だけ実行します。

## テンプレート更新

`.copier-answers.yml` をコミットしているため、テンプレート更新を取り込むには次を実行します。

```sh
copier update
```

特定のタグへ更新する場合:

```sh
copier update --vcs-ref vX.Y.Z
```

`*.rej` ファイルが生成された場合は、コミット前に手動で確認してください。

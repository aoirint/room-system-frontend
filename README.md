# room-system-frontend
[aoirint/RoomSystem](https://github.com/aoirint/RoomSystem)用のフロントエンド（React/TypeScript、Firebase）。

## 設定
1. FirebaseプロジェクトにWebアプリを追加する
2. `template.env`を`.env`にコピーして、APIキーなどを書き込む
3. Firebase Authenticationにユーザを手動で追加する（メールアドレス・パスワード認証を有効にする）
4. Realtime Databaseの`/users/$UID/readable`を`true`にする（`$UID`は追加したユーザのUID）
    - RtDBのルールは[aoirint/room-system-firebase](https://github.com/aoirint/room-system-firebase)にあるやつを使ってください

## Dockerイメージのビルド
```bash
make docker-build
```

## 開発サーバの起動
```bash
make start
```

## Node.js 本番用ビルド
```bash
make build
```

`build`ディレクトリに静的ホスティング可能なファイル群が出力されます。

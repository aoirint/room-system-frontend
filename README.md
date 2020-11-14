# room-system-frontend
[aoirint/RoomSystem](https://github.com/aoirint/RoomSystem)用のフロントエンド（React/TypeScript、Firebase）。

## 設定
1. FirebaseプロジェクトにWebアプリを追加する
2. `template.env`を`.env`にコピーして、APIキーなどを書き込む

## Dockerイメージのビルド
```bash
./docker_build.sh
```

## 開発サーバの起動
```bash
./docker_run.sh npm start
```

## Node.js 本番用ビルド
```bash
./docker_run.sh npm run build
```

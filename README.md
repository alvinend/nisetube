# NiseTube
A Simple video uploader with React, FFMPEG and Express 

## 日本語
### まず必要となる
FFMPEG, node.js と yarn インストール済のサーバ

### インストール
1. front/package.json のファイルのproxyのところでサーバのIPアドレスに変更する 例 :"http://10.0.0.75:5000/"
2. ルートで.env ファイルを作成し (参考 .env.sample) 保存先フォルダを入力する
3. `yarn`を実行する
4. frontのフォルダーで（./front)を`yarn`を実行する
5. `yarn run start`を実行する

### ノート
フロントの方3000ポートとバックの方が5000で動いている（サーバの設定の調整が必要かも）

## English
### Prerequisite
A server with FFMPEG, node.js and yarn installed

### Installing
1. front/package.json Change proxy to Server Ip address exp :"http://10.0.0.75:5000/"
2. Create .env file (look at .env.sample) for Uploaded File Folder
3. run `yarn`
4. run `yarn` at 'front' folder
5. run `yarn run start`

### Note
Front will be in port 3000 and Back will be in port 5000(You might need to change your server setting)
# モック機能の使い方

このプロジェクトには、バックエンド接続なしで固定レスポンスを返すモック機能が実装されています。
これにより、バックエンドが利用できない環境でも画面操作のテストを自由に行うことができます。

## モックモードの起動方法

### 開発サーバーをモックモードで起動する

```bash
npm run start:mock
```

このコマンドで、モックデータを使用してアプリケーションが起動します。
ブラウザで `http://localhost:4200` にアクセスすると、すべてのAPIリクエストがモックレスポンスを返します。

### モックモードでビルドする

```bash
npm run build:mock
```

## モック機能の仕組み

### 1. 環境設定ファイル

- **src/environments/environment.mock.ts**: モックモード用の環境設定
  - `useMockData: true` - モックデータを使用
  - `mockDelay: 300` - レスポンス遅延(ms)

### 2. モックデータ

`src/app/services/http/mock-data/` ディレクトリに各エンドポイント用のモックデータが格納されています。

- **login-mock.data.ts**: ログイン関連
- **user-mock.data.ts**: ユーザー情報関連
- **category-mock.data.ts**: カテゴリ関連
- **icon-mock.data.ts**: アイコン一覧
- **kakeibo-mock.data.ts**: 家計簿アイテム関連
- **monthly-result-mock.data.ts**: 月次レポート関連

### 3. モックインターセプター

`src/app/services/http/mock.interceptor.ts` がHTTPリクエストをインターセプトし、
モックレスポンスを返します。

## サポートされているエンドポイント

| エンドポイント | メソッド | 説明 |
|---|---|---|
| `/User/Login` | POST | ユーザーログイン |
| `/User/Regist` | POST | ユーザー登録 |
| `/User/GetUserData` | GET | ユーザーデータ取得 |
| `/User/Update` | POST | ユーザー更新 |
| `/Category/GetCategoryData` | GET | カテゴリ一覧取得 |
| `/Category/RegistCategory` | POST | カテゴリ登録 |
| `/Category/UpdateCategory` | POST | カテゴリ更新 |
| `/Category/GetSingleCategory` | GET | 単一カテゴリ取得 |
| `/Icon/GetIconList` | GET | アイコン一覧取得 |
| `/Kakeibo/GetKakeiboItemList` | GET | 家計簿アイテム一覧取得 |
| `/Kakeibo/RegistKakeiboItem` | POST | 家計簿アイテム登録 |
| `/Kakeibo/GetMonthlyResult` | GET | 月次レポート取得 |

## モックデータのカスタマイズ

モックデータをカスタマイズする場合は、`src/app/services/http/mock-data/` 内の対応するファイルを編集してください。

例: カテゴリを追加する場合

```typescript
// src/app/services/http/mock-data/category-mock.data.ts
const mockCategories: CategoryItem[] = [
  // 既存のカテゴリ...
  { id: 9, categoryName: '新しいカテゴリ', inoutFlg: false, iconName: 'new_icon' }
];
```

## 通常モード（バックエンド接続）への切り替え

通常の開発モードで起動する場合は、通常のコマンドを使用してください。

```bash
npm start
```

このコマンドでは、`environment.ts` が使用され、`useMockData: false` となっているため、
実際のバックエンドAPIに接続されます。

## トラブルシューティング

### モックモードでコンソールにログが表示される

モックインターセプターは、インターセプトしたリクエストをコンソールにログ出力します。
これは正常な動作です。

```
[Mock Interceptor] Intercepting request: POST https://localhost:7010/api/User/Login
```

### モックデータが返されない

1. `environment.useMockData` が `true` になっているか確認してください
2. コンソールに警告メッセージが表示されていないか確認してください
3. ブラウザのキャッシュをクリアして再度試してください

## 開発者向け情報

### 新しいエンドポイントのモックを追加する

1. `src/app/services/http/mock-data/` に新しいモックデータファイルを作成
2. `mock.interceptor.ts` にエンドポイントマッピングを追加
3. `mock-data/index.ts` に新しいファイルをエクスポート

例:

```typescript
// 1. 新しいモックデータファイル
// src/app/services/http/mock-data/new-feature-mock.data.ts
export const mockNewFeatureResponse: ApiResponse<NewFeatureResponse> = {
  status: true,
  message: 'Success',
  result: { /* モックデータ */ }
};

// 2. mock.interceptor.ts に追加
if (url.includes('/NewFeature/GetData') && method === 'GET') {
  return returnMockResponse(mockNewFeatureResponse);
}

// 3. index.ts に追加
export * from './new-feature-mock.data';
```

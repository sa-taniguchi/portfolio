import config from '@configJson';
import { BASE_URL } from '@configJs';

export interface Props {
  FILE_PATH: string;
  ABSOLUTE_DIR: boolean;
  RELATIVE_PATH: string;
  SPECIFIED_PATH: string;
  CACHE_VERSION: string;
}

export const getRenderProps = (Astro: any): Props => {
  // BASE_URLを考慮してFILE_PATHを適切に抽出
  const fullPath = new URL(Astro.url.toString(), Astro.url.origin).pathname;
  
  // BASE_URLが設定されている場合、それを除外したパスを取得
  let FILE_PATH = '';
  if (BASE_URL && fullPath.startsWith(BASE_URL)) {
    // BASE_URLの部分を除いて、残りのパスを取得
    FILE_PATH = fullPath.substring(BASE_URL.length);
    // 先頭の/があれば削除
    if (FILE_PATH.startsWith('/')) {
      FILE_PATH = FILE_PATH.substring(1);
    }
  } else {
    // 従来通りの処理（BASE_URLがない場合や一致しない場合）
    FILE_PATH = fullPath.replace(/^\//, '');
  }

  const RELATIVE_PATH = FILE_PATH ? '../'.repeat(FILE_PATH.split('/').length - 1) : '';
  const SPECIFIED_PATH = config.ABSOLUTE_DIR ? '/' : RELATIVE_PATH;
  const CACHE_VERSION = config.CACHE_VERSION ? `?v=${config.CACHE_VERSION}` : '';

  return {
    FILE_PATH,
    ABSOLUTE_DIR: config.ABSOLUTE_DIR,
    RELATIVE_PATH,
    SPECIFIED_PATH,
    CACHE_VERSION,
  };
};
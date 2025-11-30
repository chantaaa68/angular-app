import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor() {}

  /**
   * ArrayBuffer (ハッシュ値) を16進数文字列に変換する
   * @param buffer
   * @returns 16進数文字列
   */
  public bufferToHex(buffer: ArrayBuffer): string {
    // ArrayBuffer を Uint8Array に変換する (1バイトずつの配列として扱うため)
    const byteArray = new Uint8Array(buffer);

    // 各バイトを16進数に変換し、文字列として結合する
    // 各バイトを2桁の16進数に変換し、前に '0' をパディング
    return Array.from(byteArray)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
}

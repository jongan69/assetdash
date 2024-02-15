// custom-alpaca.d.ts
import { AlpacaClient as OriginalAlpacaClient } from '@master-chief/alpaca/@types/client';

declare module '@master-chief/alpaca' {
  export type AlpacaClient = OriginalAlpacaClient;
}
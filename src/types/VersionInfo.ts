import type { Timestamp } from "firebase/firestore";

export interface VersionInfo {
  assinatura: string;
  versao: string;
  mensagem: string;
  urlDownload: string;
  obrigatoria: boolean;
  dataLancamento: Timestamp;
}

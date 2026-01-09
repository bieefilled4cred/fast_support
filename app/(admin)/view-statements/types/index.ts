export interface BankStatementRecord {
  accountname: string;
  rcrE_TIME: string;
  lchG_TIME: string;
  vfD_DATE: string;
  pstD_DATE: string;
  entrY_DATE: string;
  traN_DATE: string;
  valuE_DATE: string;
  tranid: string;
  particulars: string;
  tranremarks: string;
  dr: number;
  cr: number | null;
  balance: number;
  parT_TRAN_SRL_NUM: string;
  instrmnT_NUM: string | null;
  gL_DATE: string;
}

export type BankStatementResponse = BankStatementRecord[];

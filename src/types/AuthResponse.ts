export interface AuthResponse {
  xuid: string
  user_hash: string
  xsts_token: string
  display_claims: {
    gtg: string
    xid: string
    uhs: string
    usr: string
    utr: string
    prv: string
    agg: string
  }
  expires_on: string
}

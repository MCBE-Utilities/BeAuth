import { authenticate as auth } from '@xboxreplay/xboxlive-auth'
import { AuthResponse } from './types'

export * from './types'

const RealmAPI = 'https://pocket.realms.minecraft.net/'

class BeAuth {
  protected response: AuthResponse

  /**
   * Create a BeAuth.
   * @param {AuthResponse} chain Response from a successful authentication.
   */
  public constructor(chain: AuthResponse) {
    this.response = chain
  }

  /**
   * Get the xuid of the authenticated account.
   * @returns Xuid.
   */
  public getXuid(): string {
    return this.response?.xuid
  }

  /**
   * Get the xsts token of the authenticated account.
   * @returns Xsts token.
   */
  public getXsts(): string {
    return this.response?.xsts_token
  }

  /**
   * Get the hash of the authenticated account.
   * @returns Hash.
   */
  public getHash(): string {
    return this.response?.user_hash
  }

  /**
   * Get the gamertag of the authenticated account.
   * @returns Gamertag.
   */
  public getGamertag(): string {
    return this.response?.display_claims?.gtg
  }
}

/**
 * Authenticate to use the Minecraft Bedrock Realms API.
 * @param {string} email Email associated with your microsoft account.
 * @param {string} password Password associated with your microsoft account.
 * @param {Callback} callback Fires when successfully or unsuccessfully authenticated. 
 */
function authenticate(email: string, password: string, callback: (result: BeAuth | undefined, error: any | undefined) => void): void {
  auth(email, password, {
    XSTSRelyingParty: RealmAPI,
  })
  .then((res: AuthResponse) => {
    const auth = new BeAuth(res)

    return callback(auth, undefined)
  })
  .catch((err: any) => {
    return callback(undefined, err)
  })
}

export {
  BeAuth,
  authenticate,
}

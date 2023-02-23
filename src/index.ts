import { authenticate as auth } from '@xboxreplay/xboxlive-auth'
import { AuthResponse } from './types'

export * from './types'

const RealmAPI = 'https://pocket.realms.minecraft.net/'

class BeAuth {
  protected readonly mcbeChain: AuthResponse
  protected readonly defaultChain: AuthResponse

  /**
   * Create a BeAuth.
   * @param {AuthResponse} chain Response from a successful authentication.
   */
  public constructor(mcbeChain: AuthResponse, defaultChain: AuthResponse) {
    this.mcbeChain = mcbeChain
    this.defaultChain = defaultChain
  }

  /**
   * Get the xuid of the authenticated account.
   * @returns Xuid.
   */
  public getXuid(): string {
    return this.defaultChain?.xuid
  }

  /**
   * Get the xsts token of the authenticated account.
   * @returns Xsts token.
   */
  public getXsts(): string {
    return this.mcbeChain?.xsts_token
  }

  /**
   * Get the hash of the authenticated account.
   * @returns Hash.
   */
  public getHash(): string {
    return this.mcbeChain?.user_hash
  }

  /**
   * Get the gamertag of the authenticated account.
   * @returns Gamertag.
   */
  public getGamertag(): string {
    return this.mcbeChain?.display_claims?.gtg
  }

  public getDefaultChain(): AuthResponse {
    return this.defaultChain
  }
}

/**
 * Authenticate to use the Minecraft Bedrock Realms API.
 * @param {string} email Email associated with your microsoft account.
 * @param {string} password Password associated with your microsoft account.
 * @param {Callback} callback Fires when successfully or unsuccessfully authenticated. 
 */
function authenticate(email: string, password: string): Promise<BeAuth>
function authenticate(email: string, password: string, callback: (result: BeAuth | undefined, error: any | undefined) => void): Promise<void>
function authenticate(email: string, password: string, callback?: (result: BeAuth | undefined, error: any | undefined) => void): Promise<BeAuth | void> {
  return new Promise((result, reject) => {
    auth(email, password, {
      XSTSRelyingParty: RealmAPI,
    })
    .then(async (res: AuthResponse) => {
      const _default = (await auth(email, password)) as AuthResponse
      const _auth = new BeAuth(res, _default)
  
      if (callback) {
        return callback(_auth, undefined)
      } else {
        return result(_auth)
      }
    })
    .catch((err: any) => {
      if (callback) {
        return callback(undefined, err)
      } else {
        return reject(err)
      }
    })
  })
}

export {
  BeAuth,
  authenticate,
}

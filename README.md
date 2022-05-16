# BeAuth
Module for authenticating to Microsoft to interact with thier Minecraft Bedrock Realm API.

# Usage Example
## Typescript
```ts
import { authenticate } from '@mcbeutils/beauth'

authenticate(
  'your-email@outlook.com',
  'your-secret-password',
  (auth, error) => {
    if (error) return console.log('Failed to authorized! ' + error)

    const hash = auth.getHash()
    const xsts = auth.getXsts()

    console.log('Successfully authorized!')
  }
)
```

## JavaScript
```js
const { authenticate } = require('@mcbeutils/beauth')

authenticate(
  'your-email@outlook.com',
  'your-secret-password',
  (auth, error) => {
    if (error) return console.log('Failed to authorized! ' + error)

    const hash = auth.getHash()
    const xsts = auth.getXsts()

    console.log('Successfully authorized!')
  }
)
```
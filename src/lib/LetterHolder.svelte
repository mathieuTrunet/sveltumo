<script lang="ts">
  import type { LetterState } from '../types'

  export let letter: string = '_'
  export let state: LetterState

  const style =
    'text-align: center; width: 70px; height: 70px; border: 1px solid black; display: inline-block; vertical-align: middle' +
    '; font-size: 48px; text-transform: uppercase; user-select: none'

  const getStyle = (state?: LetterState) => {
    if (!state || state === 'wrong') return style

    return style + `; background-color: ${state === 'found' ? 'lime' : 'orange'}`
  }
</script>

<span style={getStyle(state)}>{letter}</span>

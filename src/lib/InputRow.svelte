<script lang="ts">
  import type { LetterState } from '../types'
  import LetterHolder from './LetterHolder.svelte'

  export let wordToFind: string
  export let input: string
  export let letterStateList: LetterState[] = []

  const [firstletter, ...restOfTheWord] = wordToFind
</script>

<div>
  <LetterHolder
    letter={firstletter}
    state="found"
  />{#each restOfTheWord as _letter, index}
    <LetterHolder
      letter={[...input][index]}
      state={letterStateList[index]}
    />
  {/each}
</div>

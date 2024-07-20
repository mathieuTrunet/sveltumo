<script lang="ts">
  import InputRow from './lib/InputRow.svelte'
  import type { Progress } from './types'
  import { onMount, onDestroy } from 'svelte'

  let wordToFind = 'funeraire'
  let progress: Progress[] = []
  let input: string = ''

  const handleKeyboard = (event: KeyboardEvent) => {
    const [_firstLetter, ...wordToFindMinusFirstLetter] = wordToFind
    const { key: pressedKey, isTrusted } = event

    if (!isTrusted) return

    if (pressedKey === 'Backspace') return (input = input.slice(0, -1))

    if (wordToFindMinusFirstLetter.length === input.length) {
      if (pressedKey !== 'Enter') return

      const userTry = getUserTry(input, wordToFindMinusFirstLetter)

      progress = [...progress, userTry]

      return (input = '')
    }

    if (pressedKey.match(/^[a-z]$/i)) return (input += pressedKey.toLowerCase())
  }

  const getUserTry = (input: string, wordToFind: string[]) => {
    const compareState = [...input].map((letter, key) => {
      if (letter === wordToFind[key]) return 'found'

      if (wordToFind.includes(letter)) return 'partial'

      return 'wrong'
    })

    return { input: input, letterStateList: compareState }
  }

  onMount(() => document.addEventListener('keydown', handleKeyboard, { capture: true }))
  onDestroy(() => document.removeEventListener('keydown', handleKeyboard, { capture: true }))
</script>

<main>
  <h1 style="user-select: none">SVELTUMO</h1>

  {#each progress as userTry}
    <InputRow
      {wordToFind}
      letterStateList={userTry.letterStateList}
      input={userTry.input}
    />
  {/each}
  <InputRow
    {wordToFind}
    {input}
  />
</main>

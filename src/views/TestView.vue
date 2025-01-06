<template>
  <main>
    <select v-model="exampleId" @change="result = undefined" style="padding: 0.25rem">
      <option :value="null">- WYBIERZ -</option>
      <option :value="0">WYKŁADOWCA: Logowanie</option>
      <option :value="1">WYKŁADOWCA: Lista zajęć</option>
      <option :value="2">STUDENT: Logowanie</option>
      <option :value="3">STUDENT: Lista zajęć</option>
    </select>
    <div>
      <p>Wybrany przykład</p>
      <pre><code>
<template v-if="exampleId === null">
  Wybierz przykład powyżej...
</template>
<template v-else-if="exampleId === 0">
  // logowanie na konto wykładowcy
  Backend.userLogin('pk', '123#Asd')

  // w odpowiedzi serwer powinen zwrócić token.
  // nie ma konieczności zapisu token (bibliteka kliencka ma już tą funkcję zaimplementowaną)
</template>
<template v-else-if="exampleId === 1">
  // pobranie listy zajęć dla wykładowcy
  Backend.courseTeacherSessionsGet({ pageNumber: 1, pageSize: 99999 })

  // funckja zwraca obietnicę (Promise), którą należy obsłużyć.
  // Po spełnieniu obietnicy zwracana jest lista zajęć dla zalogowanego studenta
</template>
<template v-else-if="exampleId === 2">
  // logowanie na konto studenta
  // login tworzymy wg wzorca: stu+numer indeksu
  // hasło: numer indeksu
  Backend.userLogin('stu14858', '14858')

  // w odpowiedzi serwer powinen zwrócić token.
  // nie ma konieczności zapisu token (bibliteka kliencka ma już tą funkcję zaimplementowaną)
</template>
<template v-else-if="exampleId === 3">
  // pobranie listy zajęć dla studenta
  Backend.Backend.courseStudentSessionsGet({ pageNumber: 1, pageSize: 99999 })

  // funckja zwraca obietnicę (Promise), którą należy obsłużyć.
  // Po spełnieniu obietnicy zwracana jest lista zajęć dla zalogowanego studenta
</template>

</code></pre>
    </div>
    <button
      v-if="exampleId !== null"
      @click="callExample(exampleId)"
      style="padding: 1rem; margin: 0.5rem 0"
    >
      Wykonaj
    </button>
    <div v-if="result">
      <p>Odpowiedź serwera</p>
      <pre><code>{{ result }}</code></pre>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Backend } from '@/main'
import { ref } from 'vue'

const examples = [
  () => Backend.userLogin('pk', '123#Asd').then((r) => (result.value = r)),
  () =>
    Backend.courseTeacherSessionsGet({ pageNumber: 1, pageSize: 99999 }).then(
      (r) => (result.value = r),
    ),
  () => Backend.userLogin('stu14858', '14858').then((r) => (result.value = r)),
  () =>
    Backend.courseStudentSessionsGet({ pageNumber: 1, pageSize: 99999 }).then(
      (r) => (result.value = r),
    ),
]

const exampleId = ref<number | null>(null)
const result = ref()

function callExample(exampleId: number) {
  examples[exampleId]().catch((err) => (result.value = err))
}
</script>

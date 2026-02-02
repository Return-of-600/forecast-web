<template>
  <!-- dark 클래스는 다크모드일 때만 붙음 -->
  <div class="wrap" :class="{ dark: isDark }">
    <h1 class="title">TodoList</h1>

    <form class="add" @submit.prevent="addTodo">
      <input
        v-model.trim="newText"
        class="input"
        type="text"
        placeholder="할 일을 입력하고 Enter"
        autocomplete="off"
      />
      <button class="btn" type="submit" :disabled="!newText">추가</button>
    </form>

    <div class="toolbar">
      <div class="filters">
        <button
          class="chip"
          :class="{ active: filter === 'all' }"
          @click="filter = 'all'"
        >
          전체 ({{ todos.length }})
        </button>
        <button
          class="chip"
          :class="{ active: filter === 'active' }"
          @click="filter = 'active'"
        >
          진행 ({{ activeCount }})
        </button>
        <button
          class="chip"
          :class="{ active: filter === 'done' }"
          @click="filter = 'done'"
        >
          완료 ({{ doneCount }})
        </button>
      </div>

      <button class="link" @click="clearDone" :disabled="doneCount === 0">
        완료 삭제
      </button>
    </div>

    <ul v-if="filteredTodos.length" class="list">
      <li v-for="t in filteredTodos" :key="t.id" class="item">
        <label class="left">
          <input type="checkbox" v-model="t.done" @change="persist()" />
          <span v-if="editingId !== t.id" class="text" :class="{ done: t.done }">
            {{ t.text }}
          </span>

          <input
            v-else
            ref="editInput"
            v-model.trim="editText"
            class="edit"
            type="text"
            @keyup.enter="saveEdit(t.id)"
            @keyup.esc="cancelEdit"
            @blur="saveEdit(t.id)"
          />
        </label>

        <div class="actions">
          <button class="mini" @click="startEdit(t)" :disabled="t.done">
            수정
          </button>
          <button class="mini danger" @click="removeTodo(t.id)">삭제</button>
        </div>
      </li>
    </ul>
    
    <p v-else class="empty">아직 할 일이 없어요 🙂</p>
      <!-- 다크모드 토글 -->
    <button class="mode-btn" @click="toggleDark">
      {{ isDark ? "Light" : "Dark" }}
    </button>
  </div>

</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";

const STORAGE_KEY = "vue-todos-v1";

const todos = ref([]);
const newText = ref("");
const filter = ref("all"); // all | active | done

const editingId = ref(null);
const editText = ref("");
const editInput = ref(null);

const activeCount = computed(() => todos.value.filter((t) => !t.done).length);
const doneCount = computed(() => todos.value.filter((t) => t.done).length);

const filteredTodos = computed(() => {
  if (filter.value === "active") return todos.value.filter((t) => !t.done);
  if (filter.value === "done") return todos.value.filter((t) => t.done);
  return todos.value;
});

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    todos.value = raw ? JSON.parse(raw) : [];
  } catch {
    todos.value = [];
  }
}

function addTodo() {
  const text = newText.value.trim();
  if (!text) return;

  todos.value.unshift({
    id: crypto.randomUUID(),
    text,
    done: false,
    createdAt: Date.now(),
  });

  newText.value = "";
  persist();
}

function removeTodo(id) {
  todos.value = todos.value.filter((t) => t.id !== id);
  if (editingId.value === id) cancelEdit();
  persist();
}

function clearDone() {
  todos.value = todos.value.filter((t) => !t.done);
  persist();
}

async function startEdit(todo) {
  editingId.value = todo.id;
  editText.value = todo.text;

  await nextTick();
  
  const el = Array.isArray(editInput.value) ? editInput.value[0] : editInput.value;
  el?.focus();
  el?.select();
}

function cancelEdit() {
  editingId.value = null;
  editText.value = "";
}

function saveEdit(id) {
  if (editingId.value !== id) return;
  const text = editText.value.trim();

  if (!text) {
    // 비우면 삭제로 처리
    removeTodo(id);
    return;
  }

  const target = todos.value.find((t) => t.id === id);
  if (target) target.text = text;

  cancelEdit();
  persist();
}

// 처음 로드
onMounted(load);

// todos 변경 감지 (체크박스 변경 등)
watch(
  todos,
  () => {
    persist();
  },
  { deep: true }
);

const isDark = ref(false);

// 다크모드 토글
function toggleDark() {
  isDark.value = !isDark.value;
  localStorage.setItem("todo-dark", isDark.value);
}

// 시작 시 다크모드 상태 복원
onMounted(() => {
  load();

  const saved = localStorage.getItem("todo-dark");
  if (saved !== null) {
    isDark.value = saved === "true";
  }
});

</script>

<style scoped>
.wrap {
  --bg: #ffffff;
  --text: #111111;
  --sub-text: #666;
  --border: #e5e5e5;
  --chip-bg: #f5f5f5;
  --accent: #111;
}

/* 다크모드 색상 */
.wrap.dark {
  --bg: #0f0f10;
  --text: #f5f5f5;
  --sub-text: #aaa;
  --border: #2a2a2a;
  --chip-bg: #1a1a1a;
  --accent: #fff;
}

.wrap {
  max-width: 640px;
  margin: 60px auto;
  padding: 28px;
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans KR",
    sans-serif;
}

/* 상단 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 26px;
  font-weight: 600;
}

/* 다크모드 버튼 */
.mode-btn {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
}

.add {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.input {
  flex: 1;
  padding: 10px 10px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  outline: none;
}

.input::placeholder {
  color: var(--sub-text);
}

.btn {
  padding: 10px 14px;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: var(--bg);
  cursor: pointer;
  font-size: 14px;
}

.btn:disabled {
  opacity: 0.4;
}


.toolbar {
  display: flex;
  justify-content: space-between;
  margin: 16px 0 20px;
}

.chip {
  border: 1px solid var(--border);
  background: var(--chip-bg);
  color: var(--text);
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
}

.chip.active {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}


.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.text.done {
  text-decoration: line-through;
  opacity: 0.5;
}

.edit {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
}


.actions {
  display: flex;
  gap: 6px;
}

.mini {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
}

.mini.danger {
  color: #ff6b6b;
  border-color: #ff6b6b;
}

.empty {
  margin-top: 20px;
  color: var(--sub-text);
}
</style>

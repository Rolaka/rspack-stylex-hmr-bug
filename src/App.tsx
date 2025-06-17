import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <div stylex={{ color: 'red' }}>
          Hello Vue3 TSX
        </div>
      </div>
    );
  }
});

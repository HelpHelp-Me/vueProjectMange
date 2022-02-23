<template>
  <div class="components-container">
    <aside>
      {{ $t('components.tinymceTips') }}
      <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html"> {{ $t('components.documentation') }}</a>
    </aside>
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <div class="editor-content" v-html="content" />
    <el-button class="item-btn" size="small" type="primary" @click="submitRichText">
      提交
    </el-button>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
// import axios from 'axios'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    submitRichText() {
      console.log('this.content-------', this.content)
      // axios
      //   .post('/api/richText/addRichText', {
      //     content: this.content
      //   })
      //   .then((res) => {
      //     console.log('axios res-----', res)
      //   })
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


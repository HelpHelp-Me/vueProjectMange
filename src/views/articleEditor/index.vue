<template>
  <div class="components-container">
    <!-- <aside>
      {{ $t('components.tinymceTips') }}
      <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html"> {{ $t('components.documentation') }}</a>
    </aside> -->
    <div class="title-input">
      <p>添加标题</p>
      <el-input v-model="articleTitle" placeholder="请输入标题" />
    </div>
    <div class="title-input">
      <p>添加简介</p>
      <el-input
        v-model="articleIntroduction"
        placeholder="请输入简介"
      />
    </div>
    <div class="title-input">
      <p>选择标签</p>
      <!-- <div class="tag-container">
        <div
          v-for="(item,index) in tags"
          :key="index"
          class="tag-item"
        >{{ item.tagName }}</div>
      </div> -->
      <el-checkbox-group v-model="checkTags">
        <el-checkbox-button
          v-for="(item, index) in tags"
          :key="index"
          :label="item.tagName"
        >{{ item.tagName }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="title-input">
      <p>添加封面</p>
      <el-upload
        ref="upload"
        class="upload-demo"
        action="/api/richText/addRichTextImage"
        list-type="picture-card"
        :file-list="fileList"
        :limit="1"
        :multiple="false"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :auto-upload="false"
      >
        <el-button
          slot="trigger"
          size="small"
          type="primary"
        >选取文件</el-button>
        <!-- <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button> -->
        <!-- <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div> -->
      </el-upload>
    </div>
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <div class="editor-content" v-html="content" />
    <el-button
      v-if="!isModify"
      class="item-btn"
      size="small"
      type="primary"
      @click="submitRichText"
    >
      提交
    </el-button>
    <el-button
      v-else
      class="item-btn"
      size="small"
      type="primary"
      @click="submitModify"
    >
      确认修改
    </el-button>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
// import Upload from '@/components/Upload/SingleImage3'
// import Upload from '../Ainu/upload.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'TingleDemo',
  components: { Tinymce },
  data() {
    return {
      isModify: false,
      content: '',
      articleTitle: '',
      articleIntroduction: '',
      fileList: [],
      checkTags: []
    }
  },
  created() {
    const { articleIndex } = this.$route.params
    if (articleIndex !== undefined) {
      this.isModify = true
      // console.log('articleIndex-----', articleIndex)
      this.$store.commit('article/GET_ONE_ARTICLE', articleIndex)
      console.log('currentArticle-------', this.currentArticle)
      const { articleContent, articleCoverImage, articleIntroduction, articleTitle, articleTags } = this.currentArticle
      this.content = articleContent
      this.articleTitle = articleTitle
      this.articleIntroduction = articleIntroduction
      this.fileList.push({ name: 'test.png', url: articleCoverImage })
      this.checkTags = JSON.parse(articleTags)
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tags.tags,
      currentArticle: state => state.article.currentArticle
    })
  },
  methods: {
    submitRichText() {
      const tagsArr = this.checkTags.filter(Boolean)
      if (!this.content || !this.articleTitle || !this.articleIntroduction || tagsArr.length === 0) {
        console.log('信息不完全')
        return
      }
      this.$refs.upload.submit()
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      this.modifyCoverImage = true
    },
    handlePreview(file) {
      console.log('preview--------', file)
    },
    handleSuccess(response, file, fileList) {
      const { location } = response
      console.log('cover image location-----', location)
      const tagsArr = this.checkTags.filter(Boolean)
      axios
        .post('/api/richText/addArticle', {
          articleId: this.currentArticle._id || '',
          articleTitle: this.articleTitle,
          articleIntroduction: this.articleIntroduction,
          articleCoverImage: location,
          articleContent: this.content,
          articleTags: JSON.stringify(tagsArr)
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('axios res-----', res)
            if (this.isModify) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
            } else {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
            }
            this.$store.dispatch('article/getAllArticle')
          }
        })
    },
    submitModify() {
      if (this.modifyCoverImage) {
        this.submitRichText()
      } else {
        const tagsArr = this.checkTags.filter(Boolean)
        if (!this.content || !this.articleTitle || !this.articleIntroduction || tagsArr.length === 0) {
          console.log('信息不完全')
          return
        }
        this.handleSuccess({ location: this.currentArticle.articleCoverImage })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.editor-content {
  margin-top: 20px;
}

.title-input {
  margin: 20px 0;
}

.tag-container {
  display: flex;
  .tag-item {
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #000;
    cursor: pointer;
  }
}
</style>

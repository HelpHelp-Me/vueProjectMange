<template>
  <div class="app-container list-container">
    <div
      v-for="(item, index) in articleList"
      :key="index"
      class="article-item"
      @click="navToEditor(index)"
    >
      <div
        class="close-icon-wrap"
        @click.stop="deleteArticle(item._id)"
      >
        <i class="el-icon-close" />
      </div>
      <div class="image-wrap">
        <img :src="item.articleCoverImage">
      </div>
      <div class="content-wrap">
        <p class="article-title">{{ item.articleTitle }}</p>
        <p class="article-subtitle">{{ item.articleIntroduction }}</p>
        <p>
          <a
            v-for="(tag, tagIndex) in formatTags(item.articleTags)"
            :key="tagIndex"
            class="tag-item"
          >
            {{ tag }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import tags from '@/store/modules/tags'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // articleList: []
    }
  },
  computed: {
    ...mapState({
      articleList: state => state.article.articleList
    })
  },
  methods: {
    navToEditor(index) {
      console.log('nav to editor----', index)
      this.$router.push({ name: 'ArticleEditor', params: { articleIndex: index }})
    },
    formatTags(tagString = '') {
      return JSON.parse(tagString)
    },
    deleteArticle(id) {
      console.log('delete id', id)
      this.$confirm(`是否删除该文章”`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios
          .post('/api/richText/deleteArticle', {
            id
          })
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$store.dispatch('article/getAllArticle')
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

  // created() {
  //   axios.get('/api/richText/getAllArticle').then(res => {
  //     if (res.status === 200) {
  //       console.log('res data-----', res.data)
  //       this.articleList = res.data
  //     }
  //   })
  // }
}
</script>

<style lang="scss" scoped>
.list-container {
  display: flex;
  flex-wrap: wrap;
}
.article-item {
  position: relative;
  height: 400px;
  width: 250px;
  margin-right: 50px;
  margin-bottom: 50px;
  border: 1px solid #000;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  .image-wrap {
    height: 200px;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .content-wrap {
    box-sizing: border-box;
    padding: 12px;
    .article-title {
      font-weight: bold;
    }
    .tag-item {
      color: tomato;
    }
  }
  .close-icon-wrap {
    position: absolute;
    top: 12px;
    right: 12px;
    height: 26px;
    width: 26px;
    background: rgba($color: #fff, $alpha: 0.6);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>>

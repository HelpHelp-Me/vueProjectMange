<template>
  <div class="app-container ">
    <p>已有标签</p>
    <div class="documentation-container">
      <a
        v-for="(item, index) in tags"
        :key="index"
        class="document-btn"
        @click="open(item.tagName)"
      >{{ item.tagName }}</a>
    </div>
    <el-button type="primary" @click="showAddTagAction">添加标签</el-button>
    <div v-if="showAddTag" class="add-wrap">
      <el-input
        v-model="newTagName"
        placeholder="请输入新建标签"
      />
      <el-button type="success" @click="submitTag">确认添加</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showAddTag: false,
      newTagName: ''
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tags.tags
    })
  },
  mounted() {
  },
  methods: {
    showAddTagAction() {
      this.showAddTag = true
    },
    submitTag() {
      const tagName = this.newTagName.trim()
      if (!tagName) {
        return
      }
      axios
        .post('/api/tags/addTag', {
          tagName
        })
        .then((res) => {
          this.newTagName = ''
          if (res.status === 200) {
            this.$store.dispatch('tags/getAllTags')
          }
        })
    },
    open(tagName) {
      this.$confirm(`是否删除标签“${tagName}”`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除标签----', tagName)
        axios
          .post('/api/tags/deleteTag', {
            tagName
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
}
</script>

<style lang='scss'>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    padding: 0 16px;
    margin: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}

.add-wrap {
  margin-top: 20px;
}
</style>

<template>
  <div class="box-editor-chart">
    <el-row :gutter="36">
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="add-card" @click="handleNew">
            <i class="el-icon-circle-plus"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" v-for="(item, index) in chartList" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" @click.native="handleEdit(item.id)">
          <img class="image" :src="item.img" alt="" />
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <el-dropdown style="float: right">
              <i class="el-icon-more"></i>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click.native="handleEdit(item.id)"
                    >编辑</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="handleCopy(item)"
                    >复制</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="handleDelete(item.id)"
                    >删除</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="handleView(item.id)" divided
                    >访问</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="handleView(item.id)" divided
                    >二维码</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="handleAnalyse(item)"
                    >查看统计</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <box-dialog-form ref="refProject" :option="optionProject"></box-dialog-form>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  computed,
  reactive,
  ref,
  toRefs,
} from "@vue/composition-api";

export default defineComponent({
  setup() {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      chartList: [],
    });

    const optionProject = {
      title: "新建项目",
      width:"700px",
      fullscreen:false,
      form: {
        items: [
          {
            label: "名称",
            prop: "title",
          },
          {
            label: "宽",
            span: 12,
            prop: "width",
          },
          {
            label: "高",
            span: 12,
            prop: "height",
          },
          {
            label: "密码",
            type: "password",
            prop: "password",
          },
          {
            label: "简介",
            type: "textarea",
            prop: "desc",
          },
        ],
        onSubmit: async (form: any) => {
          await handleOnSubmit(form);
        },
      },
    };

    const handleOnSubmit = async function(form: any) {
      thatData.chartList.push({
        id: 1,
        title: form.title,
        img: "#",
      });
      refProject().close();
    };

    const handleEdit = function(id: number) {
      that.$Router.push({ path: `/editor/${id}` });
    };

    const handleNew = function() {
      refProject().open();
    };

    const handleCopy = function(row: any) {

    };

    const handleDelete = function(row: any) {};

    const handleView = function(id: number) {
      that.$Router.push({ path: `/view/${id}` });
    };

    const handleAnalyse = function(row: any) {};

    const refProject = function() {
      return that.$refs["refProject"] as any;
    };

    return {
      ...toRefs(thatData),
      handleEdit,
      handleNew,
      handleCopy,
      handleDelete,
      handleView,
      handleAnalyse,
      optionProject,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-editor-chart {
  .page-header-slot {
    position: fixed;
    top: 56px;
    left: 240px;
    right: 0;
    padding: 0 40px 20px;
    z-index: 8;
    background-color: rgba(255, 255, 255, 0.94);

    .search {
      width: 240px;
      float: right;
    }
  }

  .el-card {
    margin-bottom: 36px;

    .image {
      width: 100%;
      height: 150px;
      display: block;
      opacity: 0.6;
      transition: opacity 0.3s ease;
    }

    &:hover {
      cursor: pointer;
      .image {
        opacity: 0.8;
      }
    }
  }

  .el-card .add-card {
    height: 195px;
    line-height: 195px;
    text-align: center;
    font-size: 82px;
    color: rgba(0, 0, 0, 0.08);
  }
}
</style>

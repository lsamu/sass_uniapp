<template>
  <div class="box-editor-chart">
    <el-row :gutter="36">
      <el-col :span="6" v-for="(item, index) in chartList" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img class="image" :src="item.img" alt="" />
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <el-dropdown style="float: right">
              <i class="el-icon-more"></i>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click.native="importChart(item._id)"
                    >导入</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="viewChart(item)"
                    >查看</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
      analyseData: [],
      analyseVisible: false,
    });

    const importChart = function(row: any) {
        
    };

    const viewChart = function(id: number) {
      //that.$Router.push({ path: `/editor/${id}` });
      // let routeUrl = that.$Router..resolve({
      //   path: `/editor/${id}`,
      // });
      // that.$Router.push()
      // window.open(routeUrl.href, "_blank");
      that.$Router.push({ path: `/view/${id}` });
    };

    return {
      ...toRefs(thatData),
      importChart,
      viewChart,
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

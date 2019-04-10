<!--广告管理-->
<template>
    <div class="ads-manage">
        <el-form label-position="left" :inline="true" :model="adsForm">
            <el-row>
                <el-col :span=8>
                    <el-form-item label="内容">
                        <el-input v-model="adsForm"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="片区">
                    <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="状态">
                    <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发布时间">
                        <el-date-picker
                                type="datetimerange"
                                range-separator="-">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="ads-table">
            <el-table
                    border
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="内容"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="图片"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="链接">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="展示片区">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="发布时间">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="收藏数">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="点赞数">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="评论数">
            </el-table-column>
                <el-table-column
                    prop="address"
                    label="点击数">
            </el-table-column>
                <el-table-column
                        prop="address"
                        label="当前状态">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="展示">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

     export default {
         data(){

             return {
                 adsForm:{

                 }
             }
         }
     }
</script>
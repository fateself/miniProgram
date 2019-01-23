<!--发布消息-->
<template>
    <div class="send-message">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="展示片区">
                <el-input ></el-input>
            </el-form-item>
            <el-form-item label="链接">
                <el-input ></el-input>
            </el-form-item>

            <el-form-item label="内容">
                <el-input type="textarea" ></el-input>
            </el-form-item>

            <el-form-item>
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">取消</el-button>
                <el-button type="primary">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<template>
    <div class="file-manager-wrapper">
        <modal @close="closeManager" title="Quản lý file" size="huge">
            <div slot="body">
                <div class="form-group row" id="file-manager-toolbar">
                    <div class="col-2">
                        <upload-btn :exts="exts" id="btn-upload-file" v-on:uploaded="reloadList"/>
                    </div>
                    <div class="col-3">
                        <div class="bootstrap-filestyle input-group">
                            <input type="text" class="form-control " placeholder="">
                            <span class="group-span-filestyle input-group-append" tabindex="0">
                                <label for="filestyle-0" class="btn btn-primary">
                                    <span class="icon-span-filestyle fas fa-search"></span>
                                    <span class="buttonText">Tìm kiếm</span>
                                </label>
                            </span>
                        </div>
                    </div>
                    <div class="col-1">
                        <pager :total="fileCount" :pageIndex="searchObj.pageIndex" :pageSize="searchObj.pageSize" :showNumber="false" @change="pageChange" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2 col-sm-12" v-if="false">
                        <div class="ibox float-e-margins">
                            <div class="ibox-content">
                                <div class="file-manager">
                                    <upload-btn :exts="exts" />
                                    <!--<h5>Hiển thị:</h5>
                                    <a href="#" class="file-control active">Tất cả</a>
                                    <a href="#" class="file-control">Tài liệu</a>
                                    <a href="#" class="file-control">Video</a>
                                    <a href="#" class="file-control">Hình ảnh</a>
                                    <div class="hr-line-dashed"></div>-->
                                    <!--<div class="hr-line-dashed"></div>
                                    <h5>Thư mục</h5>
                                    <ul class="folder-list" style="padding: 0">
                                        <li><a href=""><i class="fa fa-folder"></i> Files</a></li>
                                        <li><a href=""><i class="fa fa-folder"></i> Pictures</a></li>
                                        <li><a href=""><i class="fa fa-folder"></i> Web pages</a></li>
                                        <li><a href=""><i class="fa fa-folder"></i> Illustrations</a></li>
                                        <li><a href=""><i class="fa fa-folder"></i> Films</a></li>
                                        <li><a href=""><i class="fa fa-folder"></i> Books</a></li>
                                    </ul>
                                    <h5 class="tag-title">Tags</h5>
                                    <ul class="tag-list" style="padding: 0">
                                        <li><a href="">Family</a></li>
                                        <li><a href="">Work</a></li>
                                        <li><a href="">Home</a></li>
                                        <li><a href="">Children</a></li>
                                        <li><a href="">Holidays</a></li>
                                        <li><a href="">Music</a></li>
                                        <li><a href="">Photography</a></li>
                                        <li><a href="">Film</a></li>
                                    </ul>-->
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
                        <div class="row">
                            <div class="col-lg-12">
                                <file-item v-if="files" :file="file" v-for="file in files" :key="file.id" v-on:select="select(file)" v-on:deselect="deselect(file)"></file-item>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template slot="footer">
                <div class="d-flex flex-fill justify-content-between">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal" @click="closeManager">Đóng</button>
                    <button type="button" class="btn btn-primary waves-effect waves-light" v-show="selected&& selected.length>0" @click="insert"><span class="icon-span-filestyle fas fa-arrow-circle-down"></span>Chèn {{selected.length}} file đã chọn</button>
                </div>
            </template>
        </modal>
    </div>
</template>
<style>
    #btn-upload-file { }
    .file-box { float: left; width: 200px; }
    .file-manager h5 { text-transform: uppercase; }
    .file-manager { list-style: none outside none; margin: 0; padding: 0; }
    .folder-list li a { color: #666666; display: block; padding: 5px 0; }
    .folder-list li { border-bottom: 1px solid #e7eaec; display: block; }
        .folder-list li i { margin-right: 8px; color: #3d4d5d; }
    .category-list li a { color: #666666; display: block; padding: 5px 0; }
    .category-list li { display: block; }
        .category-list li i { margin-right: 8px; color: #3d4d5d; }
        .category-list li a .text-navy { color: #1ab394; }
        .category-list li a .text-primary { color: #1c84c6; }
        .category-list li a .text-info { color: #23c6c8; }
        .category-list li a .text-danger { color: #EF5352; }
        .category-list li a .text-warning { color: #F8AC59; }
    .file-manager h5.tag-title { margin-top: 20px; }
    .tag-list li { float: left; }
        .tag-list li a { font-size: 12px; background-color: #f3f3f4; padding: 5px 12px; color: inherit; border-radius: 2px; border: 1px solid #e7eaec; margin-right: 5px; margin-top: 5px; display: block; }
    .file { border: 1px solid #e7eaec; padding: 0; background-color: #ffffff; position: relative; margin-bottom: 20px; margin-right: 20px; }
    .file-manager .hr-line-dashed { margin: 15px 0; }
    .file .icon,
    .file .image { height: 100px; overflow: hidden; }
    .file .icon { padding: 15px 10px; text-align: center; }
    .file-control { color: inherit; font-size: 12px; margin-right: 10px; }
        .file-control.active { text-decoration: underline; }
    .file .icon i { font-size: 70px; color: #dadada; }
    .file .file-name { padding: 10px; background-color: #f8f8f8; border-top: 1px solid #e7eaec; }
    .file-name small { color: #676a6c; }
    ul.tag-list li { list-style: none; }
    .corner { position: absolute; display: inline-block; width: 0; height: 0; line-height: 0; border: 0.6em solid transparent; border-right: 0.6em solid #f1f1f1; border-bottom: 0.6em solid #f1f1f1; right: 0em; bottom: 0em; }
    a.compose-mail { padding: 8px 10px; }
    .mail-search { max-width: 300px; }
    .ibox { clear: both; margin-bottom: 25px; margin-top: 0; padding: 0; }
        .ibox.collapsed .ibox-content { display: none; }
        .ibox.collapsed .fa.fa-chevron-up:before { content: "\f078"; }
        .ibox.collapsed .fa.fa-chevron-down:before { content: "\f077"; }
        .ibox:after,
        .ibox:before { display: table; }
    .ibox-title { -moz-border-bottom-colors: none; -moz-border-left-colors: none; -moz-border-right-colors: none; -moz-border-top-colors: none; background-color: #ffffff; border-color: #e7eaec; border-image: none; border-style: solid solid none; border-width: 3px 0 0; color: inherit; margin-bottom: 0; padding: 14px 15px 7px; min-height: 48px; }
    .ibox-content { background-color: #ffffff; color: inherit; }
    .ibox-footer { color: inherit; border-top: 1px solid #e7eaec; font-size: 90%; background: #ffffff; padding: 10px 15px; }
    #file-manager-toolbar { background: #f7f7f7; margin-top: -1rem; padding: 7px 0; }
        #file-manager-toolbar ul { margin-bottom: 0; }
        #file-manager-toolbar input { height: calc(2.06rem + 2px) }

    @media(max-width: 1450px) {
        .file-box { width: calc(100% / 7); }
    }

    @media(max-width: 1300px) {
        .file-box { width: calc(100% / 6); }
    }

    @media(max-width: 1000px) {
        .file-box { width: calc(100% / 4); }
    }

    @media(max-width: 800px) {
        .file-box { width: calc(100% / 3); }
        .file { margin-bottom: 15px; margin-right: 15px; }
    }

    @media(max-width: 600px) {
        .file-box { width: calc(100% / 2); }
        .file { margin-top: 10px; margin-right: 10px; }
    }
</style>

<script>
    import uploadBtn from './upload-btn';
    import fileItem from './file-item';
    import { mapActions, mapGetters } from 'vuex';
    export default {
        name: 'file-manager',
        components: { uploadBtn, fileItem },
        computed: {
            ...mapGetters(['files', 'fileCount'])
        },
        props: {
            exts: {
                type: String,
                default: 'png;jpg;jpeg;gif'
            },
            maxSelect: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                searchObj: {
                    pageIndex: 1,
                    pageSize: 18,
                    keyword: '',
                    exts: ''
                },
                selected: []
            }
        },
        methods: {
            ...mapActions(['getListFiles']),
            list() {
                this.getListFiles(this.searchObj);
            },
            closeManager() {
                this.$emit('close');
            },
            select(file) {
                //if (this.maxSelect == 1) {
                //    this.$emit('deselectAll');
                //}
                let index = this._.findIndex(this.selected, (o) => { return o.id == file.id });
                if (index == -1)
                    this.selected.push(file);
                else
                    this.selected = this.selected.splice(index, 1);
            },
            deselect(file) {
                let index = this._.findIndex(this.selected, (o) => { return o.id == file.id });
                if (index != -1)
                    this.$delete(this.selected, index);
            },
            insert() {
                if (this.selected && this.selected.length > 0) {
                    this.$emit('insert', this.selected);
                    this.closeManager();
                }
            },
            pageChange(page) {
                this.searchObj.pageIndex = page;
                this.list();
            },
            reloadList() {
                this.searchObj.pageIndex = 1;
                this.list();
            }
        },
        created() {
            this.searchObj.exts = this.exts;
            this.list();
        }
    }
</script>
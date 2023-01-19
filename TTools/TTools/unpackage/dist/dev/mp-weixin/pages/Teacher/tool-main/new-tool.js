"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      Img: "/static/add.webp",
      toolInfo: {
        name: "",
        LabelId: 0,
        intro: "",
        addCount: 1,
        managerId: 0,
        limit_days: 7,
        img: null
      },
      range: [
        { value: 4, text: "机械工具" },
        { value: 5, text: "电控工具" },
        { value: 6, text: "机械电子设备" }
      ],
      filesize: 0
    };
  },
  created() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
    this.toolInfo.managerId = getApp().globalData.uid;
    console.log(this.toolInfo.managerId);
  },
  methods: {
    upFile() {
      let that = this;
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: "original",
        //指定原图
        success: (res) => {
          that.filesize = res.tempFiles[0].size / 1024 / 1024;
          if (that.filesize > 1) {
            that.$util.msg("上传文件大小不能超过1MB");
            return;
          }
          console.log(res.tempFilePaths[0]);
          that.toolInfo.img = res.tempFiles[0];
          that.toolInfo.img2 = res.tempFilePaths[0];
        },
        error: (err) => {
          console.log(err);
        }
      });
    },
    upload() {
      console.log(this.toolInfo);
      this.submit();
    },
    submit() {
      console.log(this.toolInfo.LabelId);
      console.log(this.toolInfo.img);
      common_vendor.index.request({
        header: {
          "Authorization": getApp().globalData.token,
          "content-type": "application/x-www-form-urlencoded"
        },
        url: getApp().globalData.urlRoot + "/manager/createTool",
        data: {
          "limit_days": this.toolInfo.limit_days,
          "name": this.toolInfo.name,
          "LabelId": this.toolInfo.LabelId,
          "intro": this.toolInfo.intro,
          "addCount": this.toolInfo.addCount,
          "img": this.toolInfo.img,
          "uid": -2
        },
        method: "POST",
        success: (res) => {
          console.log(res.data);
          if (res.data.error_code === 0) {
            common_vendor.index.showToast({
              title: "工具添加成功",
              icon: "success"
            });
          } else {
            common_vendor.index.showToast({
              title: "工具添加失败",
              icon: "error",
              error_code: res.error_code
            });
          }
        }
      });
    },
    submit2() {
    },
    cancel() {
      common_vendor.index.navigateTo({
        url: "/pages/Teacher/tea-main/tea-main"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_number_box2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_number_box = () => "../../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_number_box + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.toolInfo.name = $event),
    b: common_vendor.p({
      placeholder: "请输入工具名称",
      modelValue: $data.toolInfo.name
    }),
    c: common_vendor.p({
      label: "工具名称",
      required: true
    }),
    d: common_vendor.o(($event) => $data.toolInfo.LabelId = $event),
    e: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.toolInfo.LabelId
    }),
    f: common_vendor.p({
      label: "工具分类",
      required: ""
    }),
    g: $data.toolInfo.img2 ? $data.toolInfo.img2 : $data.Img,
    h: common_vendor.o((...args) => $options.upFile && $options.upFile(...args)),
    i: common_vendor.p({
      label: "工具图片",
      required: ""
    }),
    j: common_vendor.o(($event) => $data.toolInfo.addCount = $event),
    k: common_vendor.p({
      min: 1,
      modelValue: $data.toolInfo.addCount
    }),
    l: common_vendor.p({
      label: "工具数量",
      required: true
    }),
    m: common_vendor.o(($event) => $data.toolInfo.limit_days = $event),
    n: common_vendor.p({
      min: 1,
      modelValue: $data.toolInfo.limit_days
    }),
    o: common_vendor.p({
      label: "限借天数",
      required: true
    }),
    p: common_vendor.o(($event) => $data.toolInfo.intro = $event),
    q: common_vendor.p({
      type: "textarea",
      modelValue: $data.toolInfo.intro
    }),
    r: common_vendor.p({
      label: "工具详情"
    }),
    s: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    t: common_vendor.o((...args) => $options.upload && $options.upload(...args)),
    v: common_vendor.sr("baseForm", "3bac002b-2,3bac002b-1"),
    w: common_vendor.p({
      labelWidth: "170rpx",
      ["label-position"]: "left"
    }),
    x: common_vendor.p({
      title: "新增工具",
      type: "line"
    }),
    y: common_vendor.p({
      title: "工具管理",
      subTitle: "",
      titleFontSize: "20px",
      subTitleFontSize: "18px",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/\u5DE5\u8BAD\u4E2D\u5FC3\u5DE5\u5177\u7BA1\u7406/Tool_manage_BUAA/TTools/TTools/pages/Teacher/tool-main/new-tool.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      labelId: 0,
      cover: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg",
      extraIcon: {
        color: "#4cd964",
        size: "22",
        type: "gear-filled"
      },
      toolList: [],
      toolInfo: {},
      range: {},
      borrowCount: 1,
      purpose: "",
      startTime: "",
      returnTime: "",
      uid: -1
    };
  },
  onLoad: function(option) {
    console.log(option.labelId);
    this.labelId = option.labelId;
    this.getList();
  },
  onShow() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
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
          that.toolInfo.img = res.tempFiles[0];
          console.log(res.tempFiles[0]);
          that.toolInfo.img2 = res.tempFilePaths[0];
        },
        error: (err) => {
          console.log(err);
        }
      });
    },
    submitEdit() {
      console.log("进入函数");
      console.log(this.toolInfo.limit_days);
      console.log(this.toolInfo.url);
      common_vendor.index.request({
        header: {
          "Authorization": getApp().globalData.token,
          "content-type": "application/x-www-form-urlencoded"
        },
        url: getApp().globalData.urlRoot + "/manager/editTool1",
        data: {
          "limit_days": this.toolInfo.limit_days,
          "name": this.toolInfo.name,
          "toolId": this.toolInfo.id,
          "intro": this.toolInfo.intro,
          "setCount": this.toolInfo.totalCount,
          "img": this.toolInfo.img,
          "uid": -2
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            console.log("正常返回");
            this.$refs.popup.close();
            common_vendor.index.reLaunch({
              url: "/pages/Teacher/tea-main/tea-main"
            });
          }
        }
      });
    },
    getList() {
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/user/getLabelToolList",
        data: { labelId: this.labelId },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            console.log(res.data.toolList);
            this.toolList = res.data.toolList;
          }
        }
      });
    },
    showInfo(index) {
      this.toolInfo = this.toolList[index];
      this.$refs.popupinfo.open("center");
    },
    toggle(type, index) {
      this.type = type;
      this.toolInfo = this.toolList[index];
      this.$refs.popup.open(type);
    },
    onClick(e) {
      console.log(e);
    },
    actionsClick(text) {
      this.$refs.popup.close();
      this.$refs.popupinfo.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_card2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_number_box2 + _easycom_uni_forms2 + _easycom_uni_popup2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_number_box = () => "../../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_number_box + _easycom_uni_forms + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.toolList, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.limit_days),
        d: common_vendor.t(item.leftCount),
        e: common_vendor.t(item.totalCount),
        f: common_vendor.o(($event) => $options.showInfo(index), index),
        g: common_vendor.o(($event) => $options.toggle("center", index), index),
        h: common_vendor.o($options.onClick, index),
        i: "07efba1a-3-" + i0 + "," + ("07efba1a-2-" + i0),
        j: index,
        k: "07efba1a-2-" + i0 + ",07efba1a-1",
        l: common_vendor.p({
          index
        })
      };
    }),
    b: common_vendor.p({
      column: 2,
      highlight: true,
      square: false
    }),
    c: common_vendor.p({
      title: "工具借用",
      subTitle: "",
      titleFontSize: "20px",
      subTitleFontSize: "18px",
      type: "line"
    }),
    d: $data.toolInfo.img2 ? $data.toolInfo.img2 : _ctx.Img,
    e: common_vendor.o((...args) => $options.upFile && $options.upFile(...args)),
    f: common_vendor.o((...args) => _ctx.uploadImg && _ctx.uploadImg(...args)),
    g: common_vendor.p({
      label: "工具图片",
      required: ""
    }),
    h: common_vendor.o(($event) => $data.toolInfo.name = $event),
    i: common_vendor.p({
      placeholder: "请输入工具名称",
      modelValue: $data.toolInfo.name
    }),
    j: common_vendor.p({
      label: "工具名称",
      required: true
    }),
    k: common_vendor.o(($event) => $data.toolInfo.totalCount = $event),
    l: common_vendor.p({
      min: 1,
      modelValue: $data.toolInfo.totalCount
    }),
    m: common_vendor.p({
      label: "工具数量",
      required: true
    }),
    n: common_vendor.o(($event) => $data.toolInfo.limit_days = $event),
    o: common_vendor.p({
      min: 1,
      modelValue: $data.toolInfo.limit_days
    }),
    p: common_vendor.t($data.toolInfo.leftCount),
    q: $data.toolInfo.shortReturnTime
  }, $data.toolInfo.shortReturnTime ? {
    r: common_vendor.t($data.toolInfo.shortReturnTime)
  } : {}, {
    s: common_vendor.p({
      label: "限借天数",
      required: true
    }),
    t: common_vendor.o(($event) => $data.toolInfo.intro = $event),
    v: common_vendor.p({
      type: "textarea",
      modelValue: $data.toolInfo.intro
    }),
    w: common_vendor.p({
      label: "工具简介"
    }),
    x: common_vendor.sr("baseForm", "07efba1a-8,07efba1a-6"),
    y: common_vendor.p({
      modelValue: $data.toolInfo,
      labelWidth: "150rpx",
      ["label-position"]: "left"
    }),
    z: common_vendor.p({
      title: "编辑工具信息",
      type: "line"
    }),
    A: common_vendor.o(($event) => $options.actionsClick("取消")),
    B: common_vendor.o(($event) => $options.submitEdit()),
    C: common_vendor.o($options.onClick),
    D: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    E: common_vendor.sr("popup", "07efba1a-4"),
    F: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    G: $data.toolInfo.url,
    H: common_vendor.t($data.toolInfo.name),
    I: common_vendor.t($data.toolInfo.limit_days),
    J: common_vendor.t($data.toolInfo.leftCount),
    K: common_vendor.t($data.toolInfo.totalCount),
    L: $data.toolInfo.shortReturnTime
  }, $data.toolInfo.shortReturnTime ? {
    M: common_vendor.t($data.toolInfo.shortReturnTime)
  } : {}, {
    N: $data.toolInfo.intro
  }, $data.toolInfo.intro ? {
    O: common_vendor.t($data.toolInfo.intro)
  } : {}, {
    P: common_vendor.o(($event) => $options.actionsClick("取消")),
    Q: common_vendor.o($options.onClick),
    R: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    S: common_vendor.sr("popupinfo", "07efba1a-17"),
    T: common_vendor.p({
      ["background-color"]: "#fff"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/git_clong/Tool_manage_BUAA/TTools/TTools/pages/Teacher/tool-main/tool-edit-list.vue"]]);
wx.createPage(MiniProgramPage);
